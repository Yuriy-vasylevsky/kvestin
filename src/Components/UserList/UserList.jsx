import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import s from './UserList.module.scss';
import imgGuest from '../../images/profile/1.jpg';
import Button from '../../Components/Button/Button';
import { setUserIdR } from '../../redux/friends/friends-slice';
import {
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
  console.log('currentUser:', currentUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const chatContainerRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [friendEmail, setFriendEmail] = useState(
    localStorage.getItem(`friends_${currentUser.email}`)
      ? localStorage.getItem(`friends_${currentUser.email}`).split(',')
      : [],
  );
  console.log('friendEmail:', friendEmail);

  // отримуємо список усіх користувачів
  useEffect(() => {
    const getUsers = async () => {
      const userRef = collection(db, 'users');

      const querySnapshot = await getDocs(userRef);
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    getUsers();
  }, []);

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
  }, []);

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
    setFriendEmail(state => [...state, otherUser.userEmail]);
    addDoc(friendsRef, {
      email: otherUser.userEmail || null,
      photo: otherUser.photo || null,
      name: otherUser.name || null,
      id: otherUser.id || null,
    });
  };
  localStorage.setItem(`friends_${currentUser.email}`, friendEmail);

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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
