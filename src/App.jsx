import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
// import { auth } from './firebase';
// import { useState } from 'react';
// import { useEffect } from 'react';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SingIn from './Pages/SingIn';

const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'));
const Profile = React.lazy(() => import('./Pages/Profile/Profile'));
const AllUsers = React.lazy(() => import('./Pages/AllUsers/AllUsers'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage/ChatPage'));
const QuestionsPage1 = React.lazy(() =>
  import('./Pages/QuestionsPage1/QuestionsPage1'),
);

const QuestionsPage2 = React.lazy(() =>
  import('./Pages/QuestionsPage2/QuestionsPage2'),
);

const QuestionsPage3 = React.lazy(() =>
  import('./Pages/QuestionsPage3/QuestionsPage3'),
);

const QuestionsPage4 = React.lazy(() =>
  import('./Pages/QuestionsPage4/QuestionsPage4'),
);
const Layouts = React.lazy(() => import('./Components/Layouts/Layouts'));

const Loading = React.lazy(() => import('./Components/Loading/Loading'));

export default function App() {
  // const [isAuth, setIsAuth] = useState(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setIsAuth(user.reloadUserInfo.email);
  //     } else {
  //       return null;
  //     }
  //   });
  // }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact element={<Layouts />}>
            <Route index element={<HomePage />} />
            <Route path="/q1" element={<QuestionsPage1 />} />
            <Route path="/q2" element={<QuestionsPage2 />} />
            <Route path="/q3" element={<QuestionsPage3 />} />
            <Route path="/q4" element={<QuestionsPage4 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sing" element={<SingIn />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
