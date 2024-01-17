// App.js
import React, { useState } from 'react';
import Friends from './Friends';
import Chat from './Chat';
import './MessengerApp.css'

const App = () => {
  const [userId, setUserId] = useState(''); // Your user ID
  const [selectedFriendId, setSelectedFriendId] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleFriendSelect = (friendId) => {
    setSelectedFriendId(friendId);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Your Chat App</h1>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="Your ID"
        />
      </header>
      <main>
        <Friends userId={userId} onFriendSelect={handleFriendSelect} />
        <Chat userId={userId} friendId={selectedFriendId} />
      </main>
    </div>
  );
};

export default App;

