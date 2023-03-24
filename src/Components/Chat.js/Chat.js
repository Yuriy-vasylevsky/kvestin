import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './chat.scss';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { photo, name, email } = useSelector(state => state.user);

  const sendMessage = async () => {
    const messagesRef = collection(db, 'messages');

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      photo,
      userName: name,
      userEmail: email,
    });

    setMessage('');
  };

  useEffect(() => {
    //ccилка на колекцію данних
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const messageList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessageList(messageList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="message-container">
        {messageList.map(
          ({ id, text, photo, userEmail, userName, createdAt }) => (
            <div
              key={id}
              className={userEmail === email ? 'my-message' : 'user-message'}
            >
              <div className="message__user">
                <img src={photo} alt="" className="message__user-img" />
                <p className="message__user-name">{userName}</p>
              </div>

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
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
