// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import firebase from './firebase';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [senderId, setSenderId] = useState(''); 
    const [recipientId, setRecipientId] = useState(''); 
    const messagesEndRef = useRef(null);

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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleMessageChange = (event) => {
        setInput(event.target.value);
    };

    const handleSenderIdChange = (event) => {
        setSenderId(event.target.value);
    };

    const handleRecipientIdChange = (event) => {
        setRecipientId(event.target.value);
    };

    const sendMessage = () => {
        if (input.trim() !== '' && senderId !== '' && recipientId !== '') {
            const messagesRef = firebase.database().ref('messages');
            const currentDate = new Date().toString(); 
            messagesRef.push({
            message: input,
            senderId: senderId,
            recipientId: recipientId,
            date: currentDate, 
        });
            setInput('');
        }
    };

   
    return (
        <div className="chat-container">
            <div className="chat-id-inputs">
                
                <input
                    type="text"
                    value={senderId}
                    onChange={handleSenderIdChange}
                    placeholder="Your ID"
                />
                <input
                    type="text"
                    value={recipientId}
                    onChange={handleRecipientIdChange}
                    placeholder="Recipient's ID"
                />
                
            </div>
            <div className="chat-messages">
                
                {messages
                .filter((message) => (message.recipientId === recipientId && message.senderId === senderId) || (message.recipientId === senderId && message.senderId === recipientId))
                .map((message, index, array) => {
                    const isMyMessage = message.senderId === senderId;
                    const prevMessage = array[index - 1];

                    const isNewDay = !prevMessage || new Date(prevMessage.date).toDateString() !== new Date(message.date).toDateString();

                    return (
                    <div key={index}>
                        {isNewDay && (
                        <div className="chat-date">
                            {new Date(message.date).toLocaleDateString('HR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                        </div>
                        )}
                        <div className={`chat-bubble ${isMyMessage ? 'my-message' : 'other-message'}`}>
                            {message.message}
                            <span className="message-time">{new Date(message.date).toLocaleTimeString('HR', { hour: 'numeric', minute: 'numeric' })}</span>
                        </div>
                    </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                type="text"
                value={input}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;