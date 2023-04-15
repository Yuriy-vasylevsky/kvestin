import React, { useState, useEffect } from 'react';
import './Footer.scss';
import Container from '../Container/Container';

import { IconContext } from 'react-icons';
import {
  BsFillChatRightHeartFill,
  BsFillArrowThroughHeartFill,
} from 'react-icons/bs';
import { FiImage } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
// import Button from '../Button/Button';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

export default function Footer({
  chatId,
  counter,
  onClik,
  cleanOll,
  handleStateChange,
  questions,
}) {
  const [message, setMessage] = useState('');
  const [messageQuestions, setMessageQuestions] = useState('');
  const { name, email } = useSelector(state => state.user);

  const sendMessage = async () => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    if (message) {
      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        // photo,
        userName: name,
        userEmail: email,
      });

      setMessage('');
    }
  };

  useEffect(() => {
    setMessageQuestions(questions);
  }, [questions]);

  const sendQuestions = async () => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    if (messageQuestions) {
      await addDoc(messagesRef, {
        text: messageQuestions,
        createdAt: serverTimestamp(),
        // photo,
        userName: name,
        userEmail: email,
      });
      setMessageQuestions('');
    }
  };

  const sendPhoto = async () => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    await addDoc(messagesRef, {
      text: 'Уяви що ти відправив картинку',
      createdAt: serverTimestamp(),
      // photo,
      userName: name,
      userEmail: email,
    });
    setMessageQuestions('');
  };

  return (
    <footer className="footer">
      <Container>
        <div className="section-footer-btn">
          <IconContext.Provider value={{ className: 'icon-send-questions' }}>
            <BsFillChatRightHeartFill onClick={onClik} />
            <BsFillArrowThroughHeartFill onClick={sendQuestions} />
          </IconContext.Provider>

          <input
            placeholder="Повідомлення"
            className="input-field"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <IconContext.Provider value={{ className: 'icon-send' }}>
            {message ? (
              <RiSendPlaneFill onClick={sendMessage} />
            ) : (
              <FiImage onClick={sendPhoto} />
            )}
          </IconContext.Provider>
        </div>
      </Container>
    </footer>
  );
}
