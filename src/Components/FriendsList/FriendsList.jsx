import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import s from './FriendsList.module.scss';
import imgGuest from '../../images/profile/1.jpg';
import Button from '../Button/Button';
import { IconContext } from 'react-icons';
import { BsChatDotsFill, BsChatHeart } from 'react-icons/bs';
import { setChatIdR } from '../../redux/chat/chat-slice';
import { setUserIdR } from '../../redux/friends/friends-slice';
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  limit,
} from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const currentUser = useSelector(state => state.user);
  const currentUserId = useSelector(state => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState(
    localStorage.getItem('selectedUserId'),
  );

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (currentUserId.userId) {
      const getUsers = async () => {
        const usersRef = collection(db, 'users');
        const userRef = doc(usersRef, currentUserId.userId);
        const friendsRef = collection(userRef, 'friends');

        const querySnapshot = await getDocs(friendsRef);
        const userList = querySnapshot.docs.map(doc => doc.data());
        setUsers(userList);
      };

      getUsers();
    }
  }, [currentUserId.userId]);

  // отримуємо id активного користувача
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const querySnapshot = query(
      usersRef,
      where('userEmail', '==', `${currentUser.email}`),
    );
    getDocs(querySnapshot)
      .then(snapshot => {
        snapshot.forEach(doc => {
          const userId = doc.id;
          //   setUserId(userId);
          dispatch(
            setUserIdR({
              userId: userId,
            }),
          );
        });
      })
      .catch(error => {
        console.error('Error getting documents: ', error);
      });
  }, []);

  // відкриваємо приватний чат з вибраним користувачем
  const chatsRef = collection(db, 'chats');

  const handleStartPrivateChat = async otherUser => {
    console.log('otherUser:', otherUser);
    setSelectedUserId(otherUser.id);
    localStorage.setItem('selectedUserId', otherUser.id);

    const q = query(
      chatsRef,
      where(`users.${currentUser.id}`, '==', true),
      where(`users.${otherUser.id}`, '==', true),
      limit(1),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatId = querySnapshot.docs[0].id;
      dispatch(
        setChatIdR({
          chatId: chatId,
          otherUserEmail: otherUser.email,
          otherUserName: otherUser.name,
        }),
        navigate('/q1'),
      );
      // setChatId(chatId);
      // setOtherUserEmail(otherUser.userEmail);
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
      dispatch(
        setChatIdR({
          chatId: chatId,
          otherUserEmail: otherUser.userEmail,
        }),
      );

      navigate('/q1');
      // setChatId(chatId);

      return chatId;
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Ваші друзі</h2>
      <ul className={s.list}>
        {users.map(({ id, photo, email, name }) => (
          <li key={id} className={s.item}>
            <div className={s.flex}>
              {photo ? (
                <img src={photo} alt="" className={s.message__user} />
              ) : (
                <img src={imgGuest} alt="" className={s.message__user} />
              )}
              {name ? (
                <p className={s.email}>{name}</p>
              ) : (
                <p className={s.email}>{email}</p>
              )}
            </div>
            {/* <Button
              onClick={() =>
                handleStartPrivateChat({
                  id,
                  photo,
                  email,
                  name,
                })
              }
              title={selectedUserId === id ? 'Вибрано' : 'Відкрити чат'}
              clasName={selectedUserId !== id ? 'userlistBtn' : 'div'}
              type={'button'}
            /> */}

            {selectedUserId === id ? (
              <IconContext.Provider
                value={{ color: '#ff014f', className: 'upload-icon' }}
              >
                <BsChatHeart
                  onClick={() =>
                    handleStartPrivateChat({
                      id,
                      photo,
                      email,
                      name,
                    })
                  }
                />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ className: 'upload-icon' }}>
                <BsChatDotsFill
                  onClick={() =>
                    handleStartPrivateChat({
                      id,
                      photo,
                      email,
                      name,
                    })
                  }
                />
              </IconContext.Provider>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
