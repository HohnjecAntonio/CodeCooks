import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './Chat.css'
import {useDispatch, useSelector} from "react-redux";

const Chat = ({ userName, friendName }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    
    const dispatch = useDispatch();
    const friendProfileInfo = useSelector(state => state.auth.profileToLoad);
    


    //ovo bi bilo da fetchamo listu prijatelja prema postojećoj listi prijatelja od nekud, tu treba zamijeniti array i element da prestavljaju listu prijatelja i id prijatelja čiji profil želimo dohvatit
    /*
    useEffect(() => {

        const fetchFriendsList = async () => {
            friendList = []
            array.forEach(async(element) => {
                await dispatch(fetchOtherProfile(element));
                friendList.append({id: friendProfileInfo.idKorisnik, username: friendProfileInfo.korisnickoIme})
            });
            return friendList;
        };

        friendList = fetchFriendsList();
        setFriendList(friendList)

    },[dispatch]);
        */

    //ovo bi bilo da fetchamo samo jednog novog prijatelja iz chata
    /*
    useEffect(() => {
        dispatch(fetchOtherProfile(JSON.parse(localStorage.getItem("friendId"))));
      }, [dispatch]);


    var userId = JSON.parse(localStorage.getItem("userId"))
    var friendId = JSON.parse(localStorage.getItem("friendId"));

    console.log("Current user ID: "+userId);
    console.log("Friend ID: "+friendId);
    console.log("Friend profile info:");
    console.log(friendProfileInfo);
    
      */


    useEffect(() => {
        const messagesRef = firebase.database().ref('messages');
        messagesRef.on('value', (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
            const messagesArray = Object.values(messagesData);
            setMessages(messagesArray);
        }
        });
        
    }, []);

    const handleSendMessage = () => {  
        if (input.trim() !== '' && userName !== '' && friendName !== '') {
            const messagesRef = firebase.database().ref('messages');
            const currentDate = new Date().toString(); 
            messagesRef.push({
            message: input,
            userName: userName,
            friendName: friendName,
            date: currentDate, 
        });
            setInput('');
        }
        
    };


    return (
        <div className="chat">
        <header>
            <h2 className='chatingWith'>{friendName}</h2>
        </header>
        <div className="messages">
            {messages
            .filter((message) => 
                (message.friendName === friendName && message.userName === userName) ||
                (message.friendName === userName && message.userName === friendName)
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((message, index, array) => {
                const isMyMessage = message.userName === userName;
                const prevMessage = array[index - 1];
    
                const isNewDay = !prevMessage || new Date(prevMessage.date).toDateString() !== new Date(message.date).toDateString();
    
                return (
                <div className='message' key={index}>
                    {isNewDay && (
                    <div className="chat-date">
                        {new Date(message.date).toLocaleDateString('HR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                    </div>
                    )}
                    <div className={`chat-bubble ${isMyMessage ? 'my-message' : 'other-message'}`}>
                    {message.message}
                    <span className={`message-time ${isMyMessage ? 'my-message-time' : 'other-message-time'}`}>
                        {new Date(message.date).toLocaleTimeString('HR', { hour: 'numeric', minute: 'numeric' })}
                    </span>
                    </div>
                </div>
                );
            })}
        </div>
        <div className="input">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
        </div>
    );
  
  
  
};

export default Chat;