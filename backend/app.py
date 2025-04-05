import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Initialize the Groq client with API key from environment variables
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

# Configure the Gemini API with API key from environment variables
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/api/whisper-transcribe', methods=['POST'])
def transcribe_audio():
    try:
        # Check if a file is provided in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        # Get the file from the request
        file = request.files['file']

        # Read the file as bytes, and reset the cursor position
        file_data = file.read()  # Read the file as bytes
        file.seek(0)  # Reset file cursor to the beginning for further use
        
        print(f"Received file with size: {len(file_data)} bytes")
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Using the Groq client for transcription
        transcription = client.audio.transcriptions.create(
            file=('audio.wav', file_data),  # Send the audio data as bytes
            model="whisper-large-v3-turbo",  # Model used for transcription
            prompt="Specify context or spelling",  # Optional: Set a custom prompt if needed
            response_format="verbose_json",  # Set the response format
            timestamp_granularities=["word", "segment"],  # Optional: Set timestamp granularity (word and/or segment)
            language="en",  # Optional: Language code for transcription
            temperature=0.0  # Optional: Control randomness of the output
        )

        # Ensure we log only the current transcription text
        transcription_text = transcription.text
        print("Latest Transcription:", transcription_text)

        # Now, send the transcription to Gemini for processing
        gemini_response = send_to_gemini(transcription_text)
        print("Gemini Response:", gemini_response)
        # Return the Gemini response to the frontend
        return jsonify({'gemini_response': gemini_response})

    except Exception as e:
        print(f"Error processing the audio: {e}")
        return jsonify({'error': str(e)}), 500


def send_to_gemini(transcription_text):
    """Function to send transcription text to Gemini LLM with a prompt."""
    # Prepare the prompt for Gemini (you can customize this part)
    prompt = f"""
    You are a text analyzer. The task is to analyze the provided text and categorize it based on the following labels:
    
    - **Dashboard**: If the text refers to anything related to the dashboard, such as "Dashboard", "overview", "control panel", "settings", "user interface", etc., return "Dashboard".
    - **Login**: If the text refers to anything related to logging in, such as "Login", "Sign In", "authentication", "username", "password", "login page", "signin", etc., return "Login".
    - **Signup**: If the text refers to anything related to user sign-up or account creation, such as "Signup", "register", "sign up", "create account", etc., return "Signup".
    - **Home**: If the text refers to anything related to the homepage, landing page, or general entry point of a website, such as "Home", "Landing", "welcome page", "homepage", etc., return "Home".
    
    NOTE: If the text refers to anything related to the following : [Insights, Kanban, Social, FAQ], anything close to these options in given then ONLY return back the words
    "Insights", "Kanban", "Social", "FAQ" respectively and nothing else.
    If nothing is matching any of the above categories, return "None" Only.
    
    Please review the following text and based on the context or keywords, return only the word representing the category (dashboard, login, signup, or home). Do not return anything else.
    
    Text:
    {transcription_text}
    
    Return the category (dashboard, login, signup, or home) OR (insights, kanban, social, faq) only, without any additional text or explanation.:
    """


    try:
        # Use the gemini-1.5-flash model for generating content from transcription text
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([transcription_text, prompt])

        # Return the text from the Gemini response
        return response.text

    except Exception as e:
        print(f"Error interacting with Gemini API: {e}")
        return "Failed to connect to Gemini."


if __name__ == '__main__':
    # Make sure uploads directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True, host='0.0.0.0', port=5000)
