import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { IconContext } from 'react-icons';

import { FiImage } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import s from './Chat.module.scss';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { photo, name, email } = useSelector(state => state.user);
  const chatContainerRef = useRef(null);
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

  const sendImage = async () => {
    const messagesRef = collection(db, 'messages');

    await addDoc(messagesRef, {
      text: 'Уяви що я відправив фото ))',
      createdAt: serverTimestamp(),
      photo,
      userName: name,
      userEmail: email,
    });

    setMessage('');
  };

  function scrollToBottom() {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

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
    <div className={s.chat_container}>
      <div className={s.message_container} ref={chatContainerRef}>
        {messageList.map(
          ({ id, text, photo, userEmail, userName, createdAt }) => (
            <div
              key={id}
              className={` ${
                userEmail === email ? s.myMessage : s.userMessage
              }`}
            >
              <div className={s.message__user}>
                <img src={photo} alt="" className={s.message__user_img} />
                {/* <p className={s.message__user_name}>{userName}</p> */}
              </div>
              <div className={s.flex}>
                <p className={s.message__user_name}>{userName}</p>
                <div className={s.message__text}>
                  <p className={s.message__text_text}>{text}</p>
                  {/* <p className="message__text-date">{createdAt.seconds}</p> */}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <input
        className={s.input_field}
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Повідомлення"
      />
      {/* <button onClick={sendMessage} className="send-button">
        Send
      </button> */}
      <IconContext.Provider value={{ className: 'chatIcon_send' }}>
        {message ? (
          <RiSendPlaneFill onClick={sendMessage} />
        ) : (
          <FiImage onClick={sendImage} />
        )}
      </IconContext.Provider>
    </div>
  );
};

export default Chat;
