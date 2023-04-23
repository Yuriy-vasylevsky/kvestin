import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import imgGuest from '../../images/profile/1.jpg';
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
import { db, storage } from '../../firebase';

import s from './Chat.module.scss';
//

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// import { ref as dbRef, push, set, onValue } from 'firebase/database';

//

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const { photo, name, email } = useSelector(state => state.user);
  const chatContainerRef = useRef(null);

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
    const messagesRef = collection(db, 'messages');

    await addDoc(messagesRef, {
      photoUrl: downloadURL,
      createdAt: serverTimestamp(),
      photo,
      userName: name,
      userEmail: email,
    });

    // setMessage('');
  };

  // Відправка повідомлень
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

  // автоскрол в низ до нових повідомлень
  function scrollToBottom() {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // Відображення нових повідомлень

  useEffect(() => {
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
          ({ id, text, photo, userEmail, userName, photoUrl, createdAt }) => (
            <div
              key={id}
              className={` ${
                userEmail === email ? s.myMessage : s.userMessage
              }`}
            >
              <div className={s.message__user}>
                <img
                  src={photo ? photo : imgGuest}
                  alt=""
                  className={s.message__user_img}
                />
              </div>
              <div className={s.flex}>
                <p className={s.message__user_name}>
                  {userName ? userName : userEmail}
                </p>
                <div className={s.message__text}>
                  <p className={s.message__text_text}>{text}</p>

                  {photoUrl && <img src={photoUrl} alt="" />}
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

      <IconContext.Provider value={{ className: 'chatIcon_send' }}>
        {message ? (
          <RiSendPlaneFill onClick={sendMessage} />
        ) : (
          // Відправка фото в чат
          <form onSubmit={handleSubmit} className={s.input_file}>
            <input
              type="file"
              onChange={handleImageChange}
              className={s.form_file}
            />
            <FiImage />
            {image && (
              <button type="submit" className={s.submit_btn}>
                Send
              </button>
            )}
          </form>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default Chat;
