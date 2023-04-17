import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import imgGuest from '../../images/profile/1.jpg';
import { IconContext } from 'react-icons';

// import { FiImage } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, database, storage } from '../../firebase';

import s from './Chat.module.scss';
//

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { ref as dbRef, push, set, onValue } from 'firebase/database';

//

const Chat = () => {
  const [message1, setMessage1] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { photo, name, email } = useSelector(state => state.user);
  const chatContainerRef = useRef(null);
  //////////////////////////////////////////////////////////
  //
  //
  //
  //
  const [message, setMessage] = useState('');
  console.log('message:', message);
  const [image, setImage] = useState(null);

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

    if (message) {
      saveMessage(message);
    }

    setMessage('');
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
          saveMessage(downloadURL);
        });
      },
    );
  };

  const saveMessage = message => {
    console.log('message:', message);
    const messageRef = push(dbRef(database, 'messages'));
    set(messageRef, {
      text: message,
    });
  };
  const messagesRef = dbRef(database, 'messages');

  onValue(messagesRef, snapshot => {
    const messages = snapshot.val();
    console.log('messages:', messages);
    // Відобразити нові повідомлення у чаті
  });
  // const saveMessage = message => {
  //   console.log('message:', message);
  //   const messageRef = push(dbRef(database, 'messages'));
  //   messageRef.set({
  //     text: message,
  //     // timestamp: Date.now(),
  //   });
  // };

  //

  // const saveMessage = message => {
  //   console.log('message:', message);
  //   const messagesRef = dbRef(db, 'messages');
  //   push(messagesRef).set({
  //     text: message,
  //     timestamp: Date.now(),
  //   });
  // };

  //
  //
  //
  //
  //
  ////////////////////////////////////////////////////////////////
  const sendMessage = async () => {
    const messagesRef = collection(db, 'messages');

    await addDoc(messagesRef, {
      text: message1,
      createdAt: serverTimestamp(),
      photo,
      userName: name,
      userEmail: email,
    });

    setMessage('');
  };

  // const sendImage = async () => {
  //   const messagesRef = collection(db, 'messages');

  //   await addDoc(messagesRef, {
  //     text: 'Уяви що я відправив фото ))',
  //     createdAt: serverTimestamp(),
  //     photo,
  //     userName: name,
  //     userEmail: email,
  //   });

  //   setMessage('');
  // };

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
                <img
                  src={photo ? photo : imgGuest}
                  alt=""
                  className={s.message__user_img}
                />
                {/* <p className={s.message__user_name}>{userName}</p> */}
              </div>
              <div className={s.flex}>
                <p className={s.message__user_name}>
                  {userName ? userName : userEmail}
                </p>
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
        value={message1}
        onChange={e => setMessage1(e.target.value)}
        placeholder="Повідомлення"
      />
      {/* <button onClick={sendMessage} className="send-button">
        Send
      </button> */}
      <IconContext.Provider value={{ className: 'chatIcon_send' }}>
        {message ? (
          <RiSendPlaneFill onClick={sendMessage} />
        ) : (
          // <FiImage onClick={sendImage} />
          // Відправка фото в чат
          <form onSubmit={handleSubmit} className={s.input_file}>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Send</button>
          </form>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default Chat;
