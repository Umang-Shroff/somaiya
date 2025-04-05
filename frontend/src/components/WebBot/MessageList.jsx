import React from 'react';
import Message from './Message';

const MessageList = ({ messages, isProcessing }) => (
  <div style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
    {messages.map((msg, i) => (
      <Message 
        key={i}
        role={msg.role}
        content={msg.content}
      />
    ))}
    {isProcessing && (
      <Message 
        role="assistant"
        content={{
          title: 'Assistant',
          content: 'Thinking...',
          actions: [],
          links: []
        }}
      />
    )}
  </div>
);

export default MessageList;