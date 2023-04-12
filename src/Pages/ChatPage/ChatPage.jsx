// import s from './QuestionsPage1.module.scss';

import Container from '../../Components/Container/Container';
// import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import Chat from '../../Components/Chat.js/Chat';
// import QuestionBoxHistory from '../../Components/Chat.js/Chat';
import Section from '../../Components/Section/Section ';
// import PrivateChat from '../../Components/PrivateChat/PrivateChat';
// import { questions1 } from '../../data/questions1';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';
// import { db } from '../../firebase';
// import {
//   collection,
//   doc,
//   addDoc,
//   serverTimestamp,
//   query,
//   orderBy,
//   onSnapshot,
// } from 'firebase/firestore';
// import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';

export default function QuestionsPage_1() {
  //   const [, setUsedNumbers] = useState([]);
  //   const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  //   const [counter, setCounter] = useState(0);
  // const [historyQuestion, setHistoryQuestion] = useState([]);
  //   const { chatId, otherUserEmail } = useSelector(state => state.chat);
  // const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return setIsAuth(true);
      } else {
        return setIsAuth(false);
      }
    });
  });
  return (
    <>
      <main className="main">
        <Container>
          {loading && <Loading />}
          <Section className={'section-hero'}>
            <Chat />
          </Section>
        </Container>
      </main>
      <ToastContainer />
    </>
  );
}
