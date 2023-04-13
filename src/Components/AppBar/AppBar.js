import React from 'react';
import s from './AppBar.module.scss';
import Container from '../Container/Container';
import imgGuest from '../../images/profile/1.jpg';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function AppBar() {
  const user = useSelector(state => state.user);

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
