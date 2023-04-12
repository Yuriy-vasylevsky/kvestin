import s from './AppBar.module.scss';
import Container from '../Container/Container';
import imgGuest from '../../images/profile/1.jpg';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { removeUser } from '../../redux/auth/auth-slices';
import { removeChatId } from '../../redux/chat/chat-slice';
import { removeUserId } from '../../redux/friends/friends-slice';
import { useDispatch } from 'react-redux';

export default function AppBar() {
  const user = useSelector(state => state.user);
  const auth = getAuth();
  const dispatch = useDispatch();

  const logAut = () => {
    auth.signOut();
    dispatch(removeUser());
    dispatch(removeChatId());
    dispatch(removeUserId());
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //     } else {
  //     }
  //   });

  //   return unsubscribe;
  // });

  return (
    <header className={s.header}>
      <Container>
        <div className={s.header__container}>
          <Link to="/" className={s.logo}>
            <span className={s.logoRed}>Q</span>
            <span className={s.logo__text}>vestin</span>
          </Link>

          {!user.email ? (
            <div className={s.auth__box}>
              <Link to="sing" className={s.text}>
                Увійти
              </Link>
              <Link to="login" className={s.text}>
                Зареєструватися
              </Link>
            </div>
          ) : (
            <div className={s.flex}>
              <Link to="/users" className={s.link}>
                {' '}
                Усі користувачі
              </Link>
              <Link to="/chat" className={s.link}>
                Общий чат
              </Link>

              <Button onClick={logAut} title={'Вийти'} clasName={'button'} />

              <div className={s.profile__box}>
                {user.name ? (
                  <p className={s.text}>{user.name}</p>
                ) : (
                  <p className={s.text}>{user.email}</p>
                )}

                <Link to="/profile" className={s.logo}>
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Аватар профіля"
                      className={s.heder__img}
                    />
                  ) : (
                    <img
                      src={imgGuest}
                      alt="Фото профіля"
                      className={s.heder__img}
                    />
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
