import React, { useState } from 'react';
import s from './AppBar.module.scss';
import { FaUserFriends } from 'react-icons/fa';
import Container from '../Container/Container';
import MobileMenu from '../MobileMenu/MobileMenu';
import imgGuest from '../../images/profile/1.jpg';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';
import { TiMessages } from 'react-icons/ti';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

export default function AppBar() {
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  function handleStateChange(newState) {
    setIsOpen(newState);
  }

  return (
    <header className={s.header}>
      <Container>
        <div className={s.header__container}>
          <Link to="/" className={s.logo}>
            <span className={s.logoRed}>K</span>
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
            <div className={s.navigation}>
              <Link to="/users" className={s.link}>
                {' '}
                Усі користувачі
              </Link>
              <Link to="/chat" className={s.link}>
                Общий чат
              </Link>
              <Link to="/info" className={s.link}>
                Інструкція
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
                </Link>{' '}
              </div>
            </div>
          )}

          {user.email && (
            <nav className={s.mobile_nav}>
              <IconContext.Provider value={{ className: 'icons' }}>
                <Link to="/info" className={s.link}>
                  <BsFillPatchQuestionFill />
                </Link>

                <Link to="/chat" className={s.link}>
                  <TiMessages />
                </Link>

                <Link to="/users" className={s.link}>
                  <FaUserFriends />
                </Link>

                <Link to="/profile" className={s.link}>
                  <FaUserCircle />
                </Link>
              </IconContext.Provider>
            </nav>
          )}

          {isOpen && <MobileMenu onChange={handleStateChange} />}
        </div>
      </Container>
    </header>
  );
}
