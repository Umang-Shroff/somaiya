import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import google.generativeai as genai
import base64

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

@app.route('/insights', methods=['POST'])
def analyze_image_and_text():
    try:
        # Check if both 'image' and 'message' are provided in the request
        if 'image' not in request.files or 'message' not in request.form:
            return jsonify({'error': 'No image or message part'}), 400

        # Get the image and text from the request
        image_file = request.files['image']
        message = request.form['message']

        if image_file.filename == '':
            return jsonify({'error': 'No selected image'}), 400

        # Convert image to base64 for sending to Gemini
        image_data = image_file.read()
        image_base64 = base64.b64encode(image_data).decode('utf-8')  # Encode the image as base64 string

        # Prepare the prompt for Gemini with the text and image data
        prompt = f"""
        Analyze the following text and image. The image is base64 encoded. The task is to categorize the text and image into one of the following labels:
        
        - **Dashboard**: Related to dashboard, settings, UI.
        - **Login**: Related to login, authentication, username/password.
        - **Signup**: Related to user registration, account creation.
        - **Home**: Related to home, landing page, or homepage.
        - **Insights, Kanban, Social, FAQ**: Specific keywords that should be categorized as such.
        - **None**: If no categories apply, return "None".
        
        Text: {message}
        
        Image (Base64 encoded): {image_base64}
        
        Return the category that best represents the text and image (dashboard, login, signup, home, insights, kanban, social, faq, or none):
        """

        # Send the prompt to Gemini for processing
        gemini_response = send_to_gemini(prompt)
        print("Gemini Response:", gemini_response)

        # Return the response to the frontend
        return jsonify({'gemini_response': gemini_response})

    except Exception as e:
        print(f"Error processing the request: {e}")
        return jsonify({'error': str(e)}), 500


def send_to_gemini(prompt):
    """Function to send the prompt to Gemini LLM for processing."""
    try:
        # Use the gemini-1.5-flash model for generating content
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([prompt])

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
