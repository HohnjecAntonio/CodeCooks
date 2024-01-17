import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friends from './Friends';
import Chat from './Chat';
import './MessengerApp.css';
import { fetchUserProfile } from '../redux/auth/auth.action';

const MessingerApp = () => {
  const [userId, setUserId] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState('');
  //const [userName, setUserName] = useState('');

  const dispatch = useDispatch();
  //const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    const getUserIdFromLocalStorage = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        dispatch(fetchUserProfile(storedUserId));
      }
    };
    getUserIdFromLocalStorage();
  }, [dispatch]);

  /*
  useEffect(() => {
    if (userProfile && userProfile.idKorisnik) {
      console.log('korisnik: ' + userProfile.idKorisnik);
      setUserName(userProfile.imeKorisnik);
    }
  }, [userProfile]);
  */

  const handleFriendSelect = (friendId) => {
    setSelectedFriendId(friendId);
  };

  return (
    <div className="app-container">
      <main>
        {userId === '' ? (
          <h1>ERROR no userId</h1>
        ) : (
          <>
            <Friends userId={userId} onFriendSelect={handleFriendSelect} />
            <Chat userId={userId} friendId={selectedFriendId} />
          </>
        )}
      </main>
    </div>
  );
};

export default MessingerApp;