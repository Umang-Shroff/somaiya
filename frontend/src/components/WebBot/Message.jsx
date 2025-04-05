import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ role, content }) => {
  // Ensure content is always an object with the expected structure
  const messageContent = typeof content === 'string' 
    ? { title: '', content, actions: [], links: [] }
    : content;

  const { title, content: parsedContent, actions = [], links = [] } = messageContent;

  return (
    <div className={`p-4 mb-3 rounded-lg max-w-[80%] text-sm ${role === 'user' ? 'bg-blue-600 text-white self-end rounded-tr-lg' : 'bg-gray-300 text-black self-start rounded-tl-lg'}`}>
      {/* 🖼️ Title */}
      {title && (
        <h4 className={`text-base font-semibold ${role === 'user' ? 'text-white' : 'text-blue-600'} mb-2`}>
          {title}
        </h4>
      )}
  
      {/* 📝 Markdown Content */}
      <div className={`mb-${actions.length > 0 || links.length > 0 ? '3' : '0'}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {parsedContent}
        </ReactMarkdown>
      </div>
  
      {/* 🛠 Suggested Actions */}
      {actions.length > 0 && (
        <div className={`pl-4 ${links.length > 0 ? 'mb-2' : 'mb-0'}`}>
          <h5 className="text-xs font-medium mb-1">Suggested Actions:</h5>
          <ul className="list-disc pl-4">
            {actions.map((action, i) => (
              <li key={i} className="mb-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {action}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {/* 🔗 Links */}
      {links.length > 0 && (
        <div className="pl-4">
          <h5 className="text-xs font-medium mb-1">References:</h5>
          <ul className="list-disc pl-4">
            {links.map((link, i) => (
              <li key={i} className="mb-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {link}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default Message;