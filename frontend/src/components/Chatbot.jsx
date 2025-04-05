import React, { useState } from "react";
import { IconSend } from "@tabler/icons-react";

const Chatbot = () => {

  return (
    <div
      className="flex-1 flex flex-col p-6 relative"
      style={{
        // backgroundImage: "url('/dashboard-bg.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
  
      {/* Chat Area */}
      <div className="flex-1 overflow-y-scroll p-24 space-y-6">
        <div className="space-y-4">
          {/* Chat bubbles */}
          <div className="flex items-start space-x-4">
            <div className="bg-[rgb(140,110,200)] text-white p-4 rounded-xl max-w-[70%]">
              Hello, how are you?
            </div>
          </div>
          <div className="flex items-start space-x-4 justify-end">
            <div className="bg-[rgb(120,90,180)] text-white p-4 rounded-xl max-w-[70%]">
              I'm good, thanks! You?
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-[rgb(100,70,160)] text-white p-4 rounded-xl max-w-[70%]">
              I'm doing great!
            </div>
          </div>
        </div>
      </div>
  
      {/* Input Box & Send Button */}
      <div className="p-6 bg-transparent flex border-neutral-700">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border pb-16 border-gray-400/50 py-4 pl-6 pr-16 rounded-3xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[rgb(140,110,200)]"
          />
          <button className="absolute cursor-pointer left-5 bottom-[2vh] bg-[rgba(140,110,200,0.15)] border border-gray-200/40 hover:bg-[rgba(140,110,200,0.20)] text-white py-2 px-6 rounded-3xl opacity-80">
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
          <button className="absolute cursor-pointer left-24 bottom-[2vh] bg-[rgba(120,90,180,0.15)] border border-gray-200/40 hover:bg-[rgba(120,90,180,0.20)] text-white py-2 ml-1 px-7 rounded-3xl opacity-80">
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
              <path d="M2 10v3" />
              <path d="M6 6v11" />
              <path d="M10 3v18" />
              <path d="M14 8v7" />
              <path d="M18 5v13" />
              <path d="M22 10v3" />
            </svg>
          </button>
          <button className="absolute cursor-pointer right-2 bottom-[-2vh] transform -translate-y-1/2 bg-purple-500 text-white py-3 px-6 rounded-3xl hover:bg-[rgb(120,90,180)] focus:outline-none focus:ring-2 focus:ring-[rgb(140,110,200)]">
            <IconSend className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Chatbot;
