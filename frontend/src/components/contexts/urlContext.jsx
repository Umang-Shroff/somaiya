import React, { createContext, useState, useContext } from "react";

// Create Context
const UrlContext = createContext();

// Provider Component
export const UrlProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(null); // 🔥 Store image data

  return (
    <UrlContext.Provider value={{ imageUrl, setImageUrl,setImageData, imageData }}>
      {children}
    </UrlContext.Provider>
  );
};

// Custom Hook (for easier access)
export const useUrl = () => useContext(UrlContext);
