import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa'; // External link icon

const JitsiMeeting = () => {
  const [roomName, setRoomName] = useState('');
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [status, setStatus] = useState('Enter a room name and click "Start Meeting"');

  // Generate random room name
  const generateRandomRoomName = () => {
    const adjectives = ['happy', 'sunny', 'quick', 'bright', 'gentle'];
    const nouns = ['panda', 'tiger', 'dolphin', 'eagle', 'koala'];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${
      nouns[Math.floor(Math.random() * nouns.length)]}-${randomNum}`;
  };

  // Update the room name based on input or focus
  const handleFocus = () => {
    if (!roomName) {
      setRoomName(generateRandomRoomName());
    }
  };

  // Handle the Start Meeting button click
  const handleStartMeeting = () => {
    if (roomName.trim() === '') {
      setStatus('Please enter a valid room name.');
      return;
    }

    setIsMeetingStarted(true);
    setStatus(`Starting meeting in room: ${roomName}`);
  };

  // Handle the End Meeting button click
  const handleEndMeeting = () => {
    setIsMeetingStarted(false);
    setRoomName('');
    setStatus('Enter a room name and click "Start Meeting"');
  };

  return (
    <div style={styles.container}>
      {!isMeetingStarted ? (
        <div style={styles.meetingContainer}>
          <h1 style={styles.heading}>Jitsi Meet Test</h1>

          <div style={styles.status}>
            {status}
          </div>

          <input
            type="text"
            value={roomName}
            onFocus={handleFocus}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name (e.g., my-test-room)"
            style={styles.input}
          />

          <div style={styles.buttonContainer}>
            <button onClick={handleStartMeeting} style={styles.startButton}>
              Start Meeting
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.meetingEmbed}>
          <h2 style={styles.heading}>Meeting in progress...</h2>
          <iframe
            title="Jitsi Meeting"
            src={`https://meet.jit.si/${encodeURIComponent(roomName)}`}
            style={styles.iframe}
            allow="camera; microphone; fullscreen"
          />
          {/* End meeting button */}
          <div style={styles.buttonContainer}>
            <button onClick={handleEndMeeting} style={styles.endButton}>
              End Meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  meetingContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  heading: {
    color: '#fff',
    marginBottom: '20px',
  },
  status: {
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    border: '1px solid #444',
    borderRadius: '4px',
    width: '100%',
    marginBottom: '15px',
    backgroundColor: '#333',
    color: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  startButton: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  endButton: {
    padding: '12px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  meetingEmbed: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  iframe: {
    width: '100%',
    height: '500px',
    border: 'none',
    borderRadius: '8px',
  },
};

export default JitsiMeeting;
