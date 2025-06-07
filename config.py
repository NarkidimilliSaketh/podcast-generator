# podcast_gemini_project/config.py
import os
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

# --- Gemini API Configuration ---
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_MODEL_NAME = "gemini-1.5-flash-latest" # Or your preferred Gemini model

# --- Application Configuration ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
PODCAST_AUDIO_FOLDER = os.path.join(BASE_DIR, 'podcast_audio')
ALLOWED_EXTENSIONS = {'pdf', 'txt'} # Allow text files too for easier testing

# --- Logging Configuration ---
LOGGING_LEVEL = logging.INFO
LOGGING_FORMAT = '%(asctime)s - %(levelname)s - [%(name)s:%(lineno)d] - %(message)s'

def setup_logging():
    """Configures application-wide logging."""
    logging.basicConfig(level=LOGGING_LEVEL, format=LOGGING_FORMAT)
    logging.getLogger("httpx").setLevel(logging.WARNING) # Reduce verbosity of httpx used by google-generativeai
    logger = logging.getLogger(__name__)
    logger.info(f"Logging configured. Uploads: {UPLOAD_FOLDER}, Podcast Audio: {PODCAST_AUDIO_FOLDER}")
    if not GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY is not set in the environment variables!")

# --- Prompt Templates ---
PODCAST_SCRIPT_PROMPT_TEMPLATE = """
You are an expert podcast creator specializing in transforming documents into engaging audio experiences.
Your task is to create a conversational podcast script based on the provided document text and the user's specific query or topic of interest.

**Instructions:**

1.  **Analyze Document & Query:** Carefully read the `DOCUMENT TEXT` and understand the `USER QUERY/TOPIC`. The podcast should primarily focus on information relevant to the user's query, drawing details and explanations from the document.
2.  **Conversational Style:**
    *   The script should sound natural, as if one or two people are discussing the content.
    *   If creating a dialogue, use clear speaker tags (e.g., "Host:", "Expert:", "Narrator:", "Analyst:"). Vary the speakers if it enhances the conversation.
    *   If creating a monologue, adopt an engaging, explanatory tone, as if a knowledgeable host is guiding the listener through the topic.
3.  **Structure:**
    *   Start with a brief, engaging introduction that hooks the listener and states the topic (derived from the user query and document).
    *   Develop the main body by breaking down complex information from the document (related to the query) into understandable segments.
    *   Use clear explanations, examples if appropriate from the text, and perhaps rhetorical questions to maintain listener engagement.
    *   Conclude with a summary of the key takeaways or a thought-provoking closing statement.
4.  **Content Focus:**
    *   Prioritize information directly from the `DOCUMENT TEXT` that addresses the `USER QUERY/TOPIC`.
    *   Do not introduce external information not present in the document.
    *   The goal is to make the document's content (as filtered by the query) accessible and interesting in an audio format.
5.  **Output Format:**
    *   Provide ONLY the podcast script.
    *   Do NOT include any preambles like "Here is the script:" or "Podcast Script:".
    *   Ensure the script is well-formatted for readability, which will also help with Text-to-Speech generation.

**User Query/Topic:**
{user_query}

**Document Text:**
--- START DOCUMENT TEXT ---
{document_text}
--- END DOCUMENT TEXT ---

**Podcast Script:**
"""