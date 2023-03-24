import React from 'react';
import Form from '../Components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  addDoc,

  // query,
  // orderBy,
  // onSnapshot,
} from 'firebase/firestore';
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

  // const hendelLoginGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then(({ user }) => {
  //       const messagesRef = collection(db, 'user');
  //       console.log('messagesRef:', messagesRef);

  //       addDoc(messagesRef, {
  //         userEmail: user.email,
  //       });

  //       dispatch(
  //         setUser({
  //           email: user.email,
  //           token: user.accessToken,
  //           id: user.uid,
  //           name: user.displayName,
  //           photo: user.photoURL,
  //         }),
  //       );

  //       navigate('/');
  //     })
  //     .catch(error => {
  //       console.log('error:', error);
  //     });
  // };

  const hendelLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // const db = getFirestore(app);
      const messagesRef = collection(db, 'user');

      await addDoc(messagesRef, {
        userEmail: user.email,
        id: user.uid,
      });

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
          <Button
            onClick={hendelLoginGoogle}
            title={'Увійти з Google'}
            clasName={'formBtn'}
            type={'button'}
          />
        </Link>
      </Form>
    </div>
  );
}
