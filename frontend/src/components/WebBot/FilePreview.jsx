import React from 'react';

const FilePreview = ({ files, snippetImage }) => (
  (files.length > 0 || snippetImage) && (
    <div style={{
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '8px',
      marginTop: '8px'
    }}>
      <h4 style={{ margin: '0 0 4px 0', fontSize: '12px' }}>Attachments:</h4>

      {snippetImage && (
        <div style={{ marginBottom: '4px' }}>
          <img src={snippetImage} alt="Snippet" style={{ maxWidth: '100%', borderRadius: '5px' }} />
        </div>
      )}

      {files.map((file, i) => (
        <div key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>
          {file.name}
        </div>
      ))}
    </div>
  )
);

export default FilePreview;
