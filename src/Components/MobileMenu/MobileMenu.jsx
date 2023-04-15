import s from './MobileMenu.module.scss';
import React, { useState } from 'react';
import imgGuest from '../../images/profile/1.jpg';
import { Link } from 'react-router-dom';
// import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';

export default function MobileMenu(onChange) {
  const user = useSelector(state => state.user);

  function handleClick() {
    const newState = false;
    onChange(newState);
  }

  return (
    <>
      <div className={s.header__container}>
        <Link to="/" className={s.logo} onClick={handleClick}>
          <span className={s.logoRed}>K</span>
          <span className={s.logo__text}>vestin</span>
        </Link>

        {!user.email ? (
          <div className={s.auth__box}>
            <Link to="sing" className={s.text} onClick={handleClick}>
              Увійти
            </Link>
            <Link to="login" className={s.text} onClick={handleClick}>
              Зареєструватися
            </Link>
          </div>
        ) : (
          <div className={s.flex}>
            <div className={s.profile__box}>
              {/* {user.name ? (
                <p className={s.text}>{user.name}</p>
              ) : (
                <p className={s.text}>{user.email}</p>
                )} */}
              <Link to="/profile" className={s.logo} onClick={handleClick}>
                {user.name ? (
                  <p className={s.text}>{user.name}</p>
                ) : (
                  <p className={s.text}>{user.email}</p>
                )}
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
              </Link>{' '}
            </div>

            <Link to="/users" className={s.link} onClick={handleClick}>
              {' '}
              Усі користувачі
            </Link>

            <Link to="/chat" className={s.link} onClick={handleClick}>
              Общий чат
            </Link>

            <Link to="/info" className={s.link} onClick={() => onChange(false)}>
              Інструкція
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
