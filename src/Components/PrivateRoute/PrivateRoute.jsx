import { Route, Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function PrivateRoute({ component: Component, isAuth }) {
  // const [isAuth, setIsAuth] = useState(11);
  // console.log('isAuth:', isAuth);

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setIsAuth(user.reloadUserInfo.email);
  //     } else {
  //       return null;
  //     }
  //   });
  // });

  return <>{isAuth ? <Component /> : <Navigate to="/login" />}</>;
}
