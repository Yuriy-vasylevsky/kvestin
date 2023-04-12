import React from 'react';
import Form from '../Components/Form/Form';
import Button from '../Components/Button/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const hendelLogin = (email, password, e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userRef = collection(db, 'users');

        addDoc(userRef, {
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
      })
      .catch(error => {
        alert('Такой Email уже существует');
      });
  };

  const hendelLoginGoogle = async () => {
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
      <Form title={'Реєстрація'} onClickForm={hendelLogin}>
        <Link to="/sing" className="link">
          <Button
            title={'Уже є акаунт?'}
            clasName={'formBtn'}
            type={'button'}
          />
        </Link>
        <Button
          onClick={hendelLoginGoogle}
          title={'Реєстрація з Google'}
          clasName={'formBtn'}
          type={'button'}
        />
      </Form>
    </div>
  );
}
