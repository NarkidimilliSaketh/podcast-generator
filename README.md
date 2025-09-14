Podcast Generator
An AI-powered podcast generator that creates podcast episodes from text content using OpenAI's GPT and text-to-speech technologies.

Features
AI-Powered Content Generation: Uses OpenAI's GPT models to generate podcast scripts from text inputs

Text-to-Speech Conversion: Converts generated scripts into natural-sounding audio using OpenAI's TTS

Background Music Integration: Automatically adds background music to enhance the listening experience

Web Interface: User-friendly web application built with Streamlit

Audio File Management: Downloads and manages generated podcast episodes

Installation
Clone the repository:

bash
git clone https://github.com/NarkidimilliSaketh/podcast-generator.git
cd podcast-generator
Install the required dependencies:

bash
pip install -r requirements.txt
Set up your OpenAI API key:

Create a .env file in the root directory

Add your OpenAI API key: OPENAI_API_KEY=your_api_key_here

Usage
Run the Streamlit application:

bash
streamlit run app.py
Open your web browser and navigate to the local URL shown in the terminal (typically http://localhost:8501)

Enter your podcast topic or text content in the input field

Click the "Generate Podcast" button

Wait for the generation process to complete (this may take a few minutes)

Download your generated podcast episode using the provided download link

Configuration
The application can be configured through the following environment variables:

OPENAI_API_KEY: Your OpenAI API key (required)

MODEL_NAME: The GPT model to use (default: "gpt-3.5-turbo")

TTS_MODEL: The text-to-speech model to use (default: "tts-1")

TTS_VOICE: The voice to use for TTS (default: "alloy")

Project Structure
text
podcast-generator/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── .gitignore           # Git ignore rules
Dependencies
streamlit: Web application framework

openai: OpenAI API client for GPT and TTS

python-dotenv: Environment variable management

requests: HTTP requests for file downloads
