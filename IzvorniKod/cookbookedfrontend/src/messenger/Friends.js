//Friends.js
import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './Friend.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfile, fetchOtherProfile, fetchOtherProfileByUsername} from "../redux/auth/auth.action";

const Friend = ({ userId, onFriendSelect }) => {
    const [speakingWith, setSpeakingWith] = useState([]);
    const [friendList, setFriendList] = useState([]);

    const dispatch = useDispatch();
    

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

    /*
    var getUserFromId = async (id) => {
        try {
            const response = await dispatch(fetchUserProfile(id));
            return response && response.payload;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };
    };

    const fetchData = async () => {
        const userPromises = speakingWith.map((friendId) => getUserFromId(friendId));
        const users = await Promise.all(userPromises);
        setFriendList(users);
      };
      
      useEffect(() => {
        fetchData();
      }, [speakingWith]);
    */
    
    const handleAddFriend = () => {
        const newFriendId = prompt('Enter the ID of the person you want to chat with:');
        const input = newFriendId.toString();
        if (input.trim() !== '' && input !== speakingWith) {
            setSpeakingWith((prevSpeakingWith) => [...prevSpeakingWith, input]);
            onFriendSelect(input);
        }
    };
    
    return (
        <div className="friends-container">
            <div className = "friend-selector-title">
                Friend Selector
            </div>
            <div className="add-friend" onClick={handleAddFriend}>
                + Add new friend
            </div>
            <div className="friends">
                {speakingWith.map((friendId, index) => (
                    <div className="friend" key={index} onClick={() => onFriendSelect(friendId)}>
                        {
                          
                            friendId
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


/*
useEffect(() => {
    
    const getUserNameFromId = (id) => {
        var names = []
        
        ids.forEach(element => {
            names.append(dispatch(fetchUserProfile(element)));
        });
    };
    getUserNameFromId();
}, [dispatch]);
*/



/*
useEffect(() => {
    const fetchData = async () => {
        const profiles = await fetchUserProfiles(speakingWith);
        console.log("Profiles:", profiles);
        setFriendList(profiles);
    };

    fetchData();
}, [dispatch, speakingWith]);
*/