import React from 'react';
import './Profile.scss';
import Container from '../../Components/Container/Container';
import FriendsList from '../../Components/FriendsList/FriendsList';
import Button from '../../Components/Button/Button';

import MagikCard from '../../Components/MagikCard/MagikCard';
import imgGuest from '../../images/profile/1.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/auth/auth-slices';
import { removeUser } from '../../redux/auth/auth-slices';
import { removeChatId } from '../../redux/chat/chat-slice';
import { removeUserId } from '../../redux/friends/friends-slice';

const Profile = () => {
  const [newName, setNewName] = useState('');
  const [newLabelName, setNewLabelName] = useState('Вибрати фото');
  const [file, setFile] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();

  // Перевірка авторизації
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/sing');
      }
    });
  });

  // Зміна імя
  const handleChangeName = e => {
    e.preventDefault();

    const trimName = newName.trim();

    if (trimName) {
      updateProfile(currentUser, {
        displayName: trimName,
      }).then(() => {
        setNewName('');
        dispatch(
          setUser({
            ...user,
            name: trimName,
          }),
        );
      });
    } else {
      return console.log('пусто');
    }
  };

  const handleFileUpload = e => {
    e.preventDefault();

    const storageRef = ref(storage, 'myFiles/' + file.name);

    if (file) {
      setIsLoading(true);

      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef).then(url => {
            dispatch(
              setUser({
                ...user,
                photo: url,
              }),
            );
            updateProfile(currentUser, {
              photoURL: url,
            });
          });
          setNewLabelName('Завантажити');
          setIsLoading(false);
          setFile('');
          console.log('Завантажено');
          // return toast('Файл успішно завантажено на Firebase Storage');
        })

        .catch(error => {
          console.log(
            'Помилка під час завантаження файлу на Firebase Storage:',
            error,
          );
        });
    } else {
      return console.log('пусто');
    }
  };

  const logAut = () => {
    auth.signOut();
    dispatch(removeUser());
    dispatch(removeChatId());
    dispatch(removeUserId());
    localStorage.setItem('selectedUserId', '');
  };

  return (
    <>
      <Container>
        <h1 className="title profile__title">Ваш профіль </h1>

        <div className="profile">
          <div className="profile__img">
            {user.photo ? (
              <img src={user.photo} alt="Фото профіля" />
            ) : (
              <img src={imgGuest} alt="Фото профіля" />
            )}
          </div>

          <div className="profile__info">
            <h2 className="profile__name">
              {user.name ? user.name : user.email}
            </h2>

            <div className="profile__update">
              <form
                onSubmit={handleChangeName}
                name="Обновити імя"
                className="update__form"
              >
                <label className="update__form-label">Обновити імя</label>
                <input
                  className="update__form-input"
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
                <Button
                  type={'submit'}
                  title={'Зберегти'}
                  clasName={'button'}
                />
              </form>

              <div className="update__photo">
                <h2 className="update__photo-title">Обновити фото</h2>
                <form
                  onSubmit={handleFileUpload}
                  className="profile__file-input"
                >
                  <input
                    className="profile__input"
                    type="file"
                    onChange={e => {
                      setFile(e.target.files[0]);
                      setNewLabelName(e.target.files[0].name);
                    }}
                  />
                  <label className="profile__input-label">{newLabelName}</label>

                  {isLoading ? (
                    <Button
                      type={'submit'}
                      title={'Йде загрузка'}
                      clasName={'div'}
                    />
                  ) : (
                    <Button
                      type={'submit'}
                      title={'Завантажити'}
                      clasName={'button'}
                    />
                  )}
                </form>
              </div>
              <Button onClick={logAut} title={'Вийти'} clasName={'button'} />
            </div>
          </div>
        </div>
        <FriendsList />
        {/* <MagikCard /> */}
      </Container>
      <ToastContainer />
    </>
  );
};

export default Profile;
