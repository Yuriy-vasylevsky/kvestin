import React from 'react';
import Form from '../Components/Form/Form';
import Button from '../Components/Button/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function SingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const onClickForm = (email, password, e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            name: user.displayName,
            photo: user.photoURL,
          }),
        );

        navigate('/');
      })

      .catch(error => {
        alert('Такогокористувача не знайдено');
      });
  };

  const hendelSingGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = collection(db, 'users');

      const querySnapshot = await getDocs(userRef);
      const allUser = querySnapshot.docs.map(doc => doc.data());
      const allEmails = allUser.map(user => user.userEmail);

      if (allEmails.includes(user.email)) {
        console.log('Цей користувач уже зареєстрований');
      } else {
        console.log('Новий користувач');
        await addDoc(userRef, {
          userEmail: user.email,
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
          token: user.accessToken,
        });
      }

      dispatch(
        setUser({
          email: user.email,
          token: user.accessToken,
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        }),
      );

      navigate('/');
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <div>
      <Form title={'Увійти'} onClickForm={onClickForm}>
        <Link to="/login" className="link">
          <Button
            title={'Немає акаунта?'}
            clasName={'formBtn'}
            type={'button'}
          />
        </Link>
        <Button
          onClick={hendelSingGoogle}
          title={'Увійти з Google'}
          clasName={'formBtn'}
          type={'button'}
        />
      </Form>
    </div>
  );
}
