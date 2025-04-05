import { createContext, useContext, useState } from 'react';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: {
        title: 'Assistant',
        content: 'Hello! How can I help you today?',
        actions: [],
        links: []
      }
    }
  ]);

  const addLog = (action) => {
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, { action, timestamp }]);
  };

// In your LogContext.js (or wherever useLog is defined)
const addChatMessage = (message) => {
  // Ensure the message has the correct structure
  const formattedMessage = {
    role: message.role,
    content: typeof message.content === 'string' 
      ? { 
          title: message.role === 'user' ? 'You' : 'Assistant',
          content: message.content,
          actions: [],
          links: []
        }
      : message.content, // Assume it's already formatted if it's an object
    ...(message.imageUrl && { imageUrl: message.imageUrl })
  };

  setChatHistory(prev => [...prev, formattedMessage]);
  addLog(`Chat: ${message.role === 'user' ? 'User sent' : 'Bot replied'} message`);
};

  return (
    <LogContext.Provider value={{ 
      logs, 
      addLog, 
      chatHistory, 
      addChatMessage,
      clearLogs: () => setLogs([])
    }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);