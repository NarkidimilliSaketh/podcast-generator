# 🎙️ AI Podcast Generator with Gemini

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-1.25%2B-red?style=for-the-badge&logo=streamlit)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_API-4285F4?style=for-the-badge&logo=google)

An AI-powered podcast generator that leverages **Google's Gemini API** to create engaging podcast episodes from any topic. It includes text-to-speech conversion and background music to deliver a complete, ready-to-listen audio experience.

---

## ✨ Features

-   **🤖 Dynamic Script Generation**: Utilizes the Google Gemini Pro model to generate creative and informative podcast scripts.
-   **🗣️ Text-to-Speech**: Converts the generated script into high-quality, natural-sounding audio.
-   **🎵 Background Music**: Automatically mixes in background music to create a professional-sounding podcast.
-   **🌐 Web Interface**: Built with Streamlit for a simple, intuitive, and user-friendly experience.
-   **🚀 Easy to Use**: Generate and download a full podcast episode with just a few clicks.

---

## ⚙️ How It Works

1.  **📥 User Input**: You provide a topic or a block of text through the Streamlit web interface.
2.  **✍️ Script Generation**: The application sends a request to the **Google Gemini API**, which generates a podcast script based on your input.
3.  **🔊 Audio Conversion**: The script is then processed by a Text-to-Speech (TTS) engine to create the voice track.
4.  **🎶 Audio Mixing**: Background music is added to the voice track to enhance the listening experience.
5.  **✅ Final Output**: The final MP3 file is made available for you to download and share.

---

## 🛠️ Technologies Used

-   **Backend**: Python
-   **Frontend**: Streamlit
-   **Core AI**: Google Gemini API
-   **Key Libraries**:
    -   `streamlit`
    -   `google-generativeai`
    -   `pydub` (for audio mixing)
    -   `gTTS` or `google-cloud-texttospeech` (for text-to-speech)
    -   `python-dotenv`

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   Python 3.8+
-   A Google Gemini API key. You can get one from **[Google AI Studio](https://makersuite.google.com/)**.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NarkidimilliSaketh/podcast-generator.git
    cd podcast-generator
    ```

2.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up your environment variables:**
    -   Create a file named `.env` in the root directory of the project.
    -   Add your Gemini API key to this file:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

---

## ▶️ Usage

1.  **Run the Streamlit application from your terminal:**
    ```bash
    streamlit run app.py
    ```

2.  Open your web browser and go to the local URL provided (usually `http://localhost:8501`).

3.  Enter the topic for your podcast in the text box.

4.  Click the **"Generate Podcast"** button.

5.  Please wait a few moments for the AI to work its magic!

6.  Once complete, a download link for the MP3 file will appear. Click to download and enjoy!

---

## 📂 Project Structure
podcast-generator/
├── 📄 app.py # The main Streamlit application script
├── 📋 requirements.txt # A list of Python libraries to install
├── 🔑 .env # Your environment variables (contains API key)
├── 📜 README.md # This file
└── 🙈 .gitignore # Files and directories to be ignored by Git


