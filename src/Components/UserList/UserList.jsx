import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import s from './UserList.module.scss';
import imgGuest from '../../images/profile/1.jpg';
import Button from '../../Components/Button/Button';

const UserList = () => {
  const [users, setUsers] = useState([]);
  console.log('users:', users);

  useEffect(() => {
    const getUsers = async () => {
      const userRef = collection(db, 'users');
      const querySnapshot = await getDocs(userRef);
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    getUsers();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.title}>User List</h2>
      <ul className={s.list}>
        {users.map(({ id, text, photo, userEmail, name, createdAt }) => (
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
              onClick={''}
              title={'Відкрити чат'}
              clasName={'userlistBtn'}
              type={'button'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
