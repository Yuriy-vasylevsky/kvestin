import React from 'react';
import Form from '../Components/Form/Form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';
// import { auth } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
// import { useState } from 'react';

export default function Login() {
  // const [userlist, setUserList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const hendelLogin = (email, password, e) => {
    e.preventDefault();
    // const auth = getAuth();
    console.log('~ auth', auth);

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

  // const hendelLoginGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then(({ user }) => {
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

  //       // const credential = GoogleAuthProvider.credentialFromResult(result);
  //       // console.log('credential:', credential);
  //       // const token = credential.accessToken;
  //       // console.log('token:', token);
  //       // const user = result.user;
  //       // console.log('user:', user);
  //     })
  //     .catch(error => {
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       // const email = error.customData.email;
  //       // const credential = GoogleAuthProvider.credentialFromError(error);
  //     });
  // };

  const hendelLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = collection(db, 'users');

      const querySnapshot = await getDocs(userRef);
      const allUser = querySnapshot.docs.map(doc => doc.data());
      const allEmails = allUser.map(user => user.userEmail);
      // setUserList(allEmails);

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
        <Link to="/login" className="link">
          <Button
            title={'Уже є акаунт?'}
            clasName={'formBtn'}
            type={'button'}
          />
          <Button
            onClick={hendelLoginGoogle}
            title={'Реєстрація з Google'}
            clasName={'formBtn'}
            type={'button'}
          />
          {/* <button onClick={hendelLoginGoogle}>Sign in with Google </button> */}
        </Link>
      </Form>
    </div>
  );
}
