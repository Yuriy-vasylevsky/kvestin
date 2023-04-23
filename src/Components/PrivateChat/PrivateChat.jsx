import React, { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './PrivateChat.scss';
// import imgGuest from '../../images/profile/1.jpg';

function PrivateChat({ chatId, otherUserEmail, otherUserName }) {
  const [messages, setMessages] = useState([]);
  const { email } = useSelector(state => state.user);
  const chatContainerRef = useRef(null);

  function scrollToBottom() {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
      <h1 className="chat-title">
        {otherUserName ? otherUserName : otherUserEmail}
      </h1>

      <div className="chat-container">
        <div className="message-container" ref={chatContainerRef}>
          {messages.map(
            ({ id, text, photo, userEmail, photoUrl, userName, createdAt }) => (
              <div
                key={id}
                className={userEmail === email ? 'my-message' : 'user-message'}
              >
                {text && (
                  <div className="message__text">
                    <p className="message__text-text">{text}</p>
                  </div>
                )}

                {photoUrl && (
                  <img src={photoUrl} alt="" className="message_photo" />
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default PrivateChat;
