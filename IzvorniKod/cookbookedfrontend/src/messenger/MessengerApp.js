import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friends from './Friends';
import Chat from './Chat';
import './MessengerApp.css';
import { fetchUserProfile } from '../redux/auth/auth.action';

const MessingerApp = () => {
  const [userId, setUserId] = useState('');
  const [selectedFriendName, setSelectedFriendName] = useState('');
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    const getUserIdFromLocalStorage = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        dispatch(fetchUserProfile(storedUserId));
      }
    };
    getUserIdFromLocalStorage();
  }, [userProfile]);
  
  
  useEffect(() => {
    if (userProfile && userProfile.idKorisnik) {
      //console.log('korisnik: ' + userProfile.idKorisnik);
      setUserName(userProfile.korisnickoIme);
    }
  }, [userProfile]);
  

  const handleFriendSelect = (friendName) => {
    setSelectedFriendName(friendName);
  };
  
  const callOnce = () => {
    const friendName = localStorage.getItem('friendUsername');
    if (friendName) {
      handleFriendSelect(friendName);
    }
  };
  
  useEffect(() => {
    callOnce();
  }, []);

  return (
    <div className="app-container">
      <main class="main-messanger-app">
        {userName === '' ? (
          <h1>ERROR no userName</h1>
        ) : (
          <>
            <Friends userName={userName} onFriendSelect={handleFriendSelect} />
            <Chat userName={userName} friendName={selectedFriendName} />
          </>
        )}
      </main>
    </div>
  );
};

export default MessingerApp;

/*
  kako preuzeti profile od userIDa
  
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    const getUserIdFromLocalStorage = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        dispatch(fetchUserProfile(storedUserId));
      }
    };
    getUserIdFromLocalStorage();
  }, [userProfile]);
  
  
  useEffect(() => {
    if (userProfile && userProfile.idKorisnik) {
      console.log('korisnik: ' + userProfile.idKorisnik);
      setUserName(userProfile.korisnickoIme);
    }
  }, [userProfile]);
  */