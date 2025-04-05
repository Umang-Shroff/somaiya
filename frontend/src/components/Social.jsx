import React, { useState } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { GoogleGenAI } from "@google/genai"

const Social = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }
  
    setLoading(true);
  
    // Initialize the GoogleGenAI instance with your API key
    const ai = new GoogleGenAI({ apiKey: 'AIzaSyAl7F82I8xPECmKHWxa3kuDpFlZZFPRkBE' });
  
    try {
      // Make the API call using the 'generateContent' method
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Adjust the model based on your requirements
        contents: `Generate a detailed summary based on the following description: ${description}.`
      });
  
      // Assuming the response is in the 'response.text' field (adjust based on API structure)
      if (response && response.text) {
        setGeneratedText(response.text); // Set the generated text to state
      } else {
        setGeneratedText('No output generated');
      }
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedText('Error generating text, please try again.');
    } finally {
      setLoading(false);
  
      // Scroll to the Generated Text section after receiving the output
      document.getElementById('generated-text-section').scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowImageModal(false); // Close the modal after selecting an image
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col pt-10 justify-center w-full max-w-lg space-y-10">
        {/* Social Platform Divs */}
        <div className="flex flex-col items-center mb-15">
          {/* Supports Label */}
          <div className="text-white text-sm mb-2">Supports</div>
          <hr className="w-24 border-t-2 border-gray-500 mb-4" />

          {/* Social Platform Divs */}
          <div className="flex justify-between w-full">
            {["Twitter", "Facebook", "LinkedIn"].map((platform, index) => (
              <div
                key={index}
                className={`flex-1 mx-2 font-serif  text-md py-4 px-4 text-center rounded-lg shadow-xl hover:opacity-90 transition duration-300 
          ${
            platform === "Twitter"
              ? "bg-gradient-to-br text-white/80 from-gray-400/70 to-black/70"
              : ""
          }
          ${
            platform === "Facebook"
              ? "bg-gradient-to-br text-white/80 from-blue-400/70 to-blue-800/70"
              : ""
          }
          ${
            platform === "LinkedIn"
              ? "bg-gradient-to-br text-white/80 from-purple-400/70 to-indigo-800/70"
              : ""
          }`}
              >
                {/* Icons */}
                {platform === "Twitter" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline-block mr-2"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                )}
                {platform === "Facebook" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline-block mr-2"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                )}
                {platform === "LinkedIn" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline-block relative bottom-1 mr-3"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )}
                {platform}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Image Section */}
        <div
          onClick={() => document.getElementById("fileInput").click()}
          className="mb-6 py-8 px-4 bg-neutral-700/80 text-center cursor-pointer relative flex justify-center items-center transition duration-300 hover:bg-neutral-600/70 border-2 border-dotted border-gray-500 rounded-md"
        >
          <span className="text-lg text-gray-200">Upload Image</span>
          {image && (
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${image})` }}
            />
          )}

          {/* Hidden File Input for Image Upload */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Enter Description Section */}
        <div className="text-center font-semibold float-left text-lg mb-2 text-gray-200">
          Enter Description
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your content..."
          className="w-full bg-neutral-700 text-white py-4 px-6 rounded-3xl placeholder-gray-400"
          rows="4"
        />

        {/* Generate Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleGenerate}
            className="py-2 px-4 bg-white cursor-pointer text-black font-semibold rounded-xl hover:bg-white/80 transition duration-300"
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <AutoAwesomeRoundedIcon /> Generate
              </>
            )}
          </button>
        </div>

        {/* Hardcoded Generated Text Section */}
        <div
          id="generated-text-section"
          className="mb-6 mt-6 w-full p-6 bg-gradient-to-tr from-black/50 via-gray-700 to-black/50 border border-gray-500/80 rounded-lg shadow-lg"
        >
          <div className="text-gray-200 text-lg font-semibold mb-4">
            Generated Text:
          </div>
          <div className="text-white">
            {generatedText || "Enter a description and click on Generate"}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex w-full justify-center">
          <button className="py-3 font-bold text-lg w-full text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition duration-300">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Social;
