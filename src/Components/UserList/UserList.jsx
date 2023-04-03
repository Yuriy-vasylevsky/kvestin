import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase';
import s from './UserList.module.scss';
import imgGuest from '../../images/profile/1.jpg';
import Button from '../../Components/Button/Button';
import PrivateChat from '../../Components/PrivateChat/PrivateChat';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  where,
  query,
  getDocs,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

const UserList = () => {
  const currentUser = useSelector(state => state.user);
  const chatContainerRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState('');
  const [otherUserEmail, setOtherUserEmail] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const userRef = collection(db, 'users');
      const querySnapshot = await getDocs(userRef);
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    console.log('chatContainer:', chatContainer);

    // Автоматичний скролінг до найновішого повідомлення
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const chatsRef = collection(db, 'chats');
  // const usersRef = collection(db, 'users');

  // функція для створення нового чату та додавання користувачів до чату
  // const createPrivateChat = async (currentUser, otherUser) => {
  //   console.log('otherUser:', otherUser);
  //   console.log('currentUser:', currentUser);
  //   // створюємо новий документ чату у колекції chats
  //   const chatRef = await addDoc(chatsRef, {});

  //   // додаємо обидвох користувачів до чату
  //   await Promise.all([
  //     setDoc(doc(chatRef, 'users', currentUser.id), {
  //       name: currentUser.userEmail,
  //       // photo: currentUser.photoURL,
  //     }),
  //     setDoc(doc(chatRef, 'users', otherUser.id), {
  //       // name: otherUser.userEmail,
  //       // photo: otherUser.photoURL,
  //     }),
  //   ]);

  //   // повертаємо ID нового чату
  //   return chatRef.id;
  // };

  const handleStartPrivateChat = async otherUser => {
    const q = query(
      chatsRef,
      where(`users.${currentUser.id}`, '==', true),
      where(`users.${otherUser.id}`, '==', true),
      limit(1),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatId = querySnapshot.docs[0].id;
      setChatId(chatId);
      setOtherUserEmail(otherUser.userEmail);
      console.log('чат уже є');
      return chatId;
    } else {
      console.log('создали новий чат');
      const chatId = `${currentUser.id}_${otherUser.id}`;
      await setDoc(doc(chatsRef, chatId), {
        users: {
          [currentUser.id]: true,
          [otherUser.id]: true,
        },
      });
      setChatId(chatId);

      return chatId;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //

  // const sendMessage = async message => {
  //   const chatRef = doc(chatsRef, chatId);

  //   // додаємо новий документ у колекцію повідомлень чату
  //   await addDoc(collection(chatRef, 'messages'), {
  //     // sender: {
  //     //   uid: sender.id,
  //     //   // name: sender.displayName,
  //     //   // photo: sender.photoURL,
  //     // },
  //     text: message,
  //     timestamp: serverTimestamp(),
  //   });
  // };

  //
  //
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={s.container}>
      <h2 className={s.title}>User List</h2>
      <ul className={s.list}>
        {users.map(({ id, photo, userEmail, name }) => (
          <li key={id} className={s.item}>
            {photo ? (
              <img src={photo} alt="" className={s.message__user} />
            ) : (
              <img src={imgGuest} alt="" className={s.message__user} />
            )}
            {name ? (
              <p className={s.email}>{name}</p>
            ) : (
              <p className={s.email}>{userEmail}</p>
            )}

            <Button
              onClick={() =>
                handleStartPrivateChat({
                  id,
                  photo,
                  userEmail,
                  name,
                })
              }
              title={'Відкрити чат'}
              clasName={'userlistBtn'}
              type={'button'}
            />
          </li>
        ))}
      </ul>
      <ul className={s.chat__list} ref={chatContainerRef}>
        {chatId ? (
          <PrivateChat chatId={chatId} otherUserEmail={otherUserEmail} />
        ) : (
          <h1> Приватний чат</h1>
        )}
      </ul>
      {/* <Button
        onClick={() => sendMessage('hrthehh')}
        title={'Semd message'}
        clasName={'userlistBtn'}
        type={'button'}
      /> */}
    </div>
  );
};

export default UserList;
