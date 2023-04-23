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
import { db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  const [image, setImage] = useState(null);
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

  // const sendPhoto = async () => {
  //   const chatsRef = collection(db, 'chats');
  //   const chatRef = doc(chatsRef, chatId);
  //   const messagesRef = collection(chatRef, 'messages');

  //   await addDoc(messagesRef, {
  //     text: 'Уяви що ти відправив картинку',
  //     createdAt: serverTimestamp(),
  //     // photo,
  //     userName: name,
  //     userEmail: email,
  //   });
  //   setMessageQuestions('');
  // };

  // Відправка фото в чат
  const handleImageChange = event => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (image) {
      uploadImage(image);
    }

    setImage(null);
  };

  const uploadImage = image => {
    const imageName = image.name;
    const imageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          // setImageUrl(downloadURL);
          sendImage(downloadURL);
        });
      },
    );
  };

  const sendImage = async downloadURL => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    await addDoc(messagesRef, {
      photoUrl: downloadURL,
      createdAt: serverTimestamp(),
      // photo,
      userName: name,
      userEmail: email,
    });

    // setMessage('');
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
              <form onSubmit={handleSubmit} className="input_file">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form_file"
                />
                <FiImage />
                {image && (
                  <button type="submit" className="submit_btn">
                    Send
                  </button>
                )}
              </form>
            )}
          </IconContext.Provider>
        </div>
      </Container>
    </footer>
  );
}
