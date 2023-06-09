import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import s from './UserList.module.scss';
import imgGuest from '../../images/profile/1.jpg';
// import Button from '../../Components/Button/Button';
import { setUserIdR } from '../../redux/friends/friends-slice';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  // getDoc,
  collection,
  doc,
  addDoc,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

const UserList = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  // const [friendEmail, setFriendEmail] = useState([]);
  // console.log('friendEmail:', friendEmail);
  const [friendEmail, setFriendEmail] = useState(
    localStorage.getItem(`friends_${currentUser.email}`)
      ? localStorage.getItem(`friends_${currentUser.email}`).split(',')
      : [],
  );

  // отримуємо список усіх користувачів окрім власного акаунту

  useEffect(() => {
    const getUsers = async () => {
      const userRef = collection(db, 'users');

      const querySnapshot = await getDocs(userRef);
      const userList = querySnapshot.docs
        .map(doc => doc.data())
        .filter(user => user.id !== currentUser.id);
      setUsers(userList);
    };

    getUsers();
  }, [currentUser]);

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
          setUserId(userId);
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
  }, [currentUser.email, dispatch, usersRef]);

  // Отримуємо список друзів для данного акк

  useEffect(() => {
    const getFriends = async () => {
      // const usersRef = collection(db, 'users');
      // const userRef = doc(usersRef, userId);
      // const friendsRef = collection(userRef, 'friends');

      if (userId) {
        const usersRef = collection(db, 'users');
        const userRef = doc(usersRef, userId);
        const friendsRef = collection(userRef, 'friends');
        const querySnapshot = await getDocs(friendsRef);
        const userList = querySnapshot.docs
          .map(doc => doc.data().email)
          .filter(user => user.id !== currentUser.id);
        setFriendEmail(userList);
      }
    };
    getFriends();
    localStorage.setItem(`friends_${currentUser.email}`, friendEmail);
  }, [currentUser.email, currentUser.id, friendEmail, userId]);

  // добавляємо друзів для данного користувача
  const handleAddNewFriends = async otherUser => {
    const userRef = doc(usersRef, userId);
    const friendsRef = collection(userRef, 'friends');

    const friendsSnapshot = await getDocs(friendsRef);

    const isFriendAlreadyAdded = friendsSnapshot.docs.some(
      doc => doc.data().email === otherUser.userEmail,
    );

    if (isFriendAlreadyAdded) {
      console.log('Друг уже доданий');
      return;
    }
    // localStorage.setItem(`friends_${currentUser.email}`, friendEmail);
    // setFriendEmail(state => [...state, otherUser.userEmail]);
    // нарешті додаємо нового друга
    addDoc(friendsRef, {
      email: otherUser.userEmail || null,
      photo: otherUser.photo || null,
      name: otherUser.name || null,
      id: otherUser.id || null,
    });
  };
  // записуємо всіх друзів для цьго акаунта в локал сторадж для того щоб відображати хто уже добавлений на цьму акауні
  // і зберігати данні при виході зі сторінки чи перезагрузці
  // localStorage.setItem(`friends_${currentUser.email}`, friendEmail);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Усі користувачі</h2>
      <ul className={s.list}>
        {users.map(({ id, photo, userEmail, name }) => (
          <li key={id} className={s.item}>
            <div className={s.user__box}>
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
            </div>

            {/* 
            <Button
              onClick={() =>
                handleAddNewFriends({
                  id,
                  photo,
                  userEmail,
                  name,
                })
              }
              title={
                friendEmail.includes(userEmail)
                  ? 'Добавлено'
                  : 'Добавити в друзі'
              }
              clasName={
                // 'userlistBtn'
                friendEmail.includes(userEmail) ? 'userlistBtn' : 'userlistBtn1'
              }
              type={'button'}
            /> */}

            {!friendEmail.includes(userEmail) ? (
              <IconContext.Provider value={{ className: 'friend-icon' }}>
                <FaUserPlus
                  onClick={() =>
                    handleAddNewFriends({
                      id,
                      photo,
                      userEmail,
                      name,
                    })
                  }
                />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ className: 'friend-icon-added' }}>
                <FaUserCheck />
              </IconContext.Provider>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
