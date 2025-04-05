import React, { useState, useEffect, useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const FloatingButton = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording function
  const startRecording = async () => {
    try {
      // Request access to the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create a MediaRecorder instance to record the audio
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      // Clear the chunks array before starting the recording
      audioChunksRef.current = [];

      // Push data to the chunks array as it is recorded
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // When the recording is stopped, process the audio data
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl); // You can use this URL to play the recording

        // Send the recorded audio to the server
        sendAudioToServer(blob); // Pass the blob (audio data) to the function
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true); // Update state to reflect recording is in progress
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };


  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false); // Update state to reflect recording is stopped
  };

  // Send the recorded audio to the Flask server for transcription
  const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    try {
      const response = await fetch('http://localhost:5000/api/whisper-transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.gemini_response) {
        
        // Get the gemini response, convert it to lowercase, and trim whitespace
        const geminiResponse = data.gemini_response.toLowerCase().trim();
        console.log('Gemini Response:', geminiResponse); // Log the response for debugging

        // Redirect logic
        if (['kanban', 'insights', 'social', 'faq'].includes(geminiResponse)) {
          window.location.href = '/dashboard';
          localStorage.setItem('selectedContent', geminiResponse);
        } else {
          window.location.href = `/${geminiResponse}`;  // Redirect to the dynamic route
        }
        
      } else {
        console.error('Error from Gemini:', data.error);
      }
    } catch (error) {
      console.error('Error sending audio to the server:', error);
    }
  };


  return (
    <button
      className="fixed bottom-5 z-50 right-5 w-12 h-12 rounded-full bg-white border-2 border-white text-2xl flex justify-center items-center cursor-pointer shadow-lg hover:bg-gray-100"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? <GraphicEqIcon/> : <KeyboardVoiceIcon/>}
    </button>
  );
};

export default FloatingButton;
