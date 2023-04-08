import React, { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './PrivateChat.scss';
import imgGuest from '../../images/profile/1.jpg';

function PrivateChat({ chatId, otherUserEmail }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { photo, name, email } = useSelector(state => state.user);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      photo,
      userName: name,
      userEmail: email,
    });

    setMessage('');
  };

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    console.log('chatRef.current.scrollTop:', chatRef.current.scrollTop);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    const q = query(messagesRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const messages = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    });

    return unsubscribe;
  }, [chatId]);

  return (
    <>
      <h1> Чат з {otherUserEmail}</h1>

      <div className="chat-container">
        <div className="message-container" ref={chatRef}>
          {messages.map(
            ({ id, text, photo, userEmail, userName, createdAt }) => (
              <div
                key={id}
                className={userEmail === email ? 'my-message' : 'user-message'}
              >
                {
                  <div className="message__user">
                    <img
                      src={photo ? photo : imgGuest}
                      alt=""
                      className="message__user-img"
                    />
                    <p className="message__user-name">
                      {userName ? userName : userEmail}
                    </p>
                  </div>
                }

                <div className="message__text">
                  <p className="message__text-text">{text}</p>
                  {/* <p className="message__text-date">{createdAt.seconds}</p> */}
                </div>
              </div>
            ),
          )}
        </div>

        <input
          className="input-field"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        }
      </div>
    </>
  );
}

export default PrivateChat;
