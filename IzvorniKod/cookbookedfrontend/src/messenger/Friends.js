//Friends.js
import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './Friend.css'

const Friend = ({ userId, onFriendSelect }) => {
    const [speakingWith, setSpeakingWith] = useState([]);

    useEffect(() => {
        const messagesRef = firebase.database().ref('messages');
        messagesRef.on('value', (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
            const messagesArray = Object.values(messagesData);
            const uniqueRecipients = Array.from(
            new Set(
                messagesArray
                .filter(
                    (message) =>
                    (message.friendId === userId && message.userId) ||
                    (message.userId === userId && message.friendId)
                )
                .map((message) =>
                    message.userId === userId ? message.friendId : message.userId
                )
            )
            );
            setSpeakingWith(uniqueRecipients);
        }
        });
    }, [userId]);

    const handleAddFriend = () => {
        const newFriendId = prompt('Enter the ID of the person you want to chat with:');
        const input = newFriendId.toString();
        if (input.trim() !== '' && input !== speakingWith) {
            setSpeakingWith((prevSpeakingWith) => [...prevSpeakingWith, input]);
            onFriendSelect(input);
        }
    };

    return (
        <div className="sidebar">
            <div className = "friend-selector-title">
                Friend Selector
            </div>
        <div className="add-friend" onClick={handleAddFriend}>
            + Add new friend
        </div>
        <div className="friends">
            {speakingWith.map((friendId, index) => (
            <div className="friend" key={index} onClick={() => onFriendSelect(friendId)}>
                {friendId}
            </div>
            ))}
        </div>
        </div>
    );
};

export default Friend;

