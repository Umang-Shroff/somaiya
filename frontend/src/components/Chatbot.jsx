import React, { useState } from "react";
import { IconSend } from "@tabler/icons-react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [geminiResponse, setGeminiResponse] = useState(null);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
      setImageUploaded(false);
    }
  };

  // Handle message send
  const handleMessageSend = () => {
    if (message.trim() || image) {
      const formData = new FormData();
      formData.append("message", message);
      if (image) {
        const imageFile = document.getElementById("imageUpload").files[0];
        formData.append("image", imageFile);
      }

      // Send the data to the backend
      fetch("http://localhost:5000/insights", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Gemini Response:", data);
          setGeminiResponse(data.gemini_response); // Set Gemini response
          setMessages([...messages, { text: message, image: image, fromUser: true }]);
          setMessage(""); // Clear message input
          setImage(null); // Clear image preview
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <div className="flex-1 flex h-[80vh] flex-col p-6 relative">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-scroll p-24 space-y-6">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${msg.fromUser ? "justify-end" : ""}`}
            >
              {msg.image ? (
                <div className="max-w-[70%]">
                  <img src={msg.image} alt="uploaded" className="rounded-xl" />
                </div>
              ) : (
                <div className="bg-[rgb(140,110,200)] text-white p-4 rounded-xl max-w-[70%]">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Box & Send Button */}
      <div className="p-6 bg-transparent relative top-5 flex border-neutral-700">
        <div className="flex-1 relative">
          <div className="w-full border pb-16 border-gray-400/50 pl-6 pr-16 rounded-3xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[rgb(140,110,200)]">
            {/* Left button for image upload */}
            <button
              className="absolute cursor-pointer left-5 bottom-[2vh] bg-[rgba(140,110,200,0.15)] border border-gray-200/40 hover:bg-[rgba(140,110,200,0.20)] text-white py-2 px-6 rounded-3xl opacity-80"
              onClick={() => document.getElementById("imageUpload").click()} // Trigger the file input
            >
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden z-50"
              />
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13.234 20.252 21 12.3" />
                <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
              </svg>
            </button>

            {/* Send Button */}
            <button
              onClick={handleMessageSend}
              className="absolute cursor-pointer right-2 bottom-[-2vh] transform -translate-y-1/2 bg-purple-500 text-white py-3 px-6 rounded-3xl hover:bg-[rgb(120,90,180)] focus:outline-none focus:ring-2 focus:ring-[rgb(140,110,200)]"
            >
              <IconSend className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {image && !imageUploaded && (
        <div className="flex justify-center relative top-5">
          <div className="bg-gray-800 p-2 rounded-xl max-w-[80%]">
            <img
              src={image}
              className="w-20 h-10 object-cover rounded-lg"
            />
            <div className="text-white text-sm">Image preview</div>
            <button
              className="text-red-500"
              onClick={() => {
                setImage(null);
                setImageUploaded(false);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Display Gemini Response */}
      {geminiResponse && (
        <div className="mt-4 p-4 bg-gray-700 text-white rounded-xl">
          <strong>Gemini Response:</strong>
          <p>{geminiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
