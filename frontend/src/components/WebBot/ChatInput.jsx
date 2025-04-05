import React, { useRef, useState } from "react";
import { FaCamera, FaPaperclip } from "react-icons/fa";
import SnippingTool from "./SnippetTool";
import { useUrl } from "../contexts/urlContext";// I

const ChatInput = ({ message, setMessage, onSend, onFileUpload }) => {
  const { imageUrl, setImageUrl } = useUrl(); // ✅ Use context
  const [triggerSnipping, setTriggerSnipping] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* 🖼️ Display Captured Image */}
      {imageUrl && (
        <div className="flex flex-col items-center gap-3">
          <img
            src={imageUrl}
            alt="Captured Snippet"
            className="max-w-full max-h-[150px] rounded-lg border border-gray-400/70"
          />
          <button
            onClick={() => setImageUrl(null)}
            className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}
  
      {/* 🔽 Chat Input */}
      <div className="flex gap-3 items-center w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && onSend()}
          className="flex-1 p-3 border border-gray-400/70 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
  
        {/* 📎 Attach File */}
        {/* <button
          onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
          className="bg-transparent border-none cursor-pointer"
        >
          <FaPaperclip className="text-white" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept=".pdf,.csv,.txt"
          multiple
          className="hidden"
        /> */}
  
        {/* 📷 Snipping Tool */}
        <button
          onClick={() => setTriggerSnipping(true)}
          className="bg-transparent border-none cursor-pointer"
        >
          <FaCamera className="text-white" />
        </button>
  
        {/* 🚀 Send Button */}
        <button
          onClick={onSend}
          className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
  
      {/* 🛠 Snipping Tool Component */}
      <SnippingTool triggerSnipping={triggerSnipping} />
    </div>
  );
  
};

export default ChatInput;
