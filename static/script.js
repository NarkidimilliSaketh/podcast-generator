// podcast_gemini_project/static/script.js
document.addEventListener('DOMContentLoaded', () => {
    const podcastForm = document.getElementById('podcast-form');
    const documentUploadInput = document.getElementById('document-upload');
    const userQueryInput = document.getElementById('user-query');
    const generateBtn = document.getElementById('generate-btn');
    const spinner = generateBtn.querySelector('.spinner-border');
    const statusMessageDiv = document.getElementById('status-message');
    
    const podcastOutputArea = document.getElementById('podcast-output-area');
    const podcastDocNameSpan = document.getElementById('podcast-doc-name');
    const podcastAudioPlayer = document.getElementById('podcast-audio-player');
    const podcastScriptOutputDiv = document.getElementById('podcast-script-output');

    podcastForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearPreviousOutput();
        showLoading(true, 'Generating podcast, please wait...');

        const formData = new FormData();
        formData.append('document', documentUploadInput.files[0]);
        formData.append('query', userQueryInput.value.trim());

        try {
            const response = await fetch('/generate_podcast', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `Server error: ${response.status}`);
            }

            if (result.error && !result.script) { // Hard error before script generation
                 showStatus(result.error, 'danger');
                 podcastOutputArea.style.display = 'none';
            } else {
                // Display script even if audio failed or there was a partial error
                if (result.script) {
                    podcastDocNameSpan.textContent = result.original_document_name || 'your document';
                    // Use marked.js to render if script contains markdown, otherwise pre-wrap
                    if (typeof marked !== 'undefined') {
                        marked.setOptions({ breaks: true, gfm: true, sanitize: false });
                        podcastScriptOutputDiv.innerHTML = marked.parse(result.script);
                    } else {
                        podcastScriptOutputDiv.textContent = result.script;
                    }
                    podcastOutputArea.style.display = 'block';
                }

                if (result.audio_url) {
                    podcastAudioPlayer.src = result.audio_url;
                    podcastAudioPlayer.load(); // Important to load new src
                    showStatus('Podcast generated successfully!', 'success');
                } else if (result.error && result.script) { // Audio failed, but script is there
                    showStatus(result.error, 'warning');
                    podcastAudioPlayer.removeAttribute('src'); // Clear any old src
                } else if (!result.script && !result.audio_url) { // Should be caught by earlier error
                    showStatus('Failed to generate podcast content.', 'danger');
                    podcastOutputArea.style.display = 'none';
                }
            }

        } catch (error) {
            console.error('Error generating podcast:', error);
            showStatus(`Error: ${error.message}`, 'danger');
            podcastOutputArea.style.display = 'none';
        } finally {
            showLoading(false);
        }
    });

    function showLoading(isLoading, message = '') {
        if (isLoading) {
            generateBtn.disabled = true;
            if (spinner) spinner.style.display = 'inline-block';
            generateBtn.childNodes[generateBtn.childNodes.length -1].textContent = ' Generating...'; // Assuming text is last node
            showStatus(message, 'info');
        } else {
            generateBtn.disabled = false;
            if (spinner) spinner.style.display = 'none';
            generateBtn.childNodes[generateBtn.childNodes.length -1].textContent = ' Generate Podcast';
        }
    }

    function showStatus(message, type = 'info') { // type can be 'info', 'success', 'warning', 'danger'
        statusMessageDiv.textContent = message;
        statusMessageDiv.className = `mt-3 small alert alert-${type}`;
        statusMessageDiv.style.display = 'block';
    }

    function clearPreviousOutput() {
        podcastOutputArea.style.display = 'none';
        podcastDocNameSpan.textContent = '';
        podcastAudioPlayer.removeAttribute('src');
        podcastAudioPlayer.pause();
        podcastScriptOutputDiv.innerHTML = ''; // Clear script
        statusMessageDiv.style.display = 'none';
        statusMessageDiv.textContent = '';
    }
});