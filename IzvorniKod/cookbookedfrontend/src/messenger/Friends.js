//Friends.js
import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './Friend.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfile, fetchOtherProfile, fetchOtherProfileByUsername} from "../redux/auth/auth.action";

const Friend = ({ userName, onFriendSelect }) => {
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
                    (message.friendName === userName && message.userName) ||
                    (message.userName === userName && message.friendName)
                )
                .map((message) =>
                    message.userName === userName ? message.friendName : message.userName
                )
            )
            );
            setSpeakingWith(uniqueRecipients);
        }
        });
    }, [userName]);

    useEffect(()=>{
        handleAddFriendAuto();
    },[]);

    const handleAddFriend = () => {
        const newfriendName = prompt('Upisi korisnickoIme prijatelja:');

        if(newfriendName!=null){
            const input = newfriendName.toString();
            if (input.trim() !== '' && input !== speakingWith) {
                setSpeakingWith((prevSpeakingWith) => [...prevSpeakingWith, input]);
                onFriendSelect(input);
            }
        }
    };

    const handleAddFriendAuto = () => {
        const newfriendName = JSON.parse(localStorage.getItem("friendUsername"));
        if(newfriendName!=null && !speakingWith.includes(newfriendName)){
            const input = newfriendName.toString();
            if (input.trim() !== '' && input !== speakingWith) {
                setSpeakingWith((prevSpeakingWith) => [...prevSpeakingWith, input]);
                onFriendSelect(input);
            }
        }
    };
    
    console.log(speakingWith);

    return (
        <div className="friends-container">
            <div className = "friend-selector-title">
                Friend Selector
            </div>
            <div className="add-friend" onClick={handleAddFriend}>
                + Add new friend
            </div>
            <div className="friends">
                {speakingWith.map((friendName, index) => (
                    <div className="friend" key={index} onClick={() => onFriendSelect(friendName)}>
                        {
                          
                            friendName
                        }
                    </div>
                    ))
                    }
                
                {/*
                    {friendList.map((user, index) => (
                        <div className="friend" key={index} onClick={() => onFriendSelect(user.id)}>
                            {user.korisnickoIme}
                        </div>
                    ))}
                    */}
            </div>
        </div>
    );
};

export default Friend;

