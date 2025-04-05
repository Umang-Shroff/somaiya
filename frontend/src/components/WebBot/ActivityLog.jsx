import React from 'react';

const ActivityLog = ({ logs }) => (
  <div style={{
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '12px'
  }}>
    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Recent Activity</h4>
    <ul style={{
      margin: 0,
      paddingLeft: '20px',
      fontSize: '12px',
      listStyleType: 'none'
    }}>
      {logs.slice(-3).map((log, i) => (
        <li key={i} style={{ marginBottom: '4px' }}>
          {new Date(log.timestamp).toLocaleTimeString()}: {log.action}
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityLog;