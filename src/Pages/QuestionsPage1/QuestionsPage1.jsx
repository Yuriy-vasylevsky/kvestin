import s from './QuestionsPage1.module.scss';

import Container from '../../Components/Container/Container';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import QuestionBox from '../../Components/QuestionBox/QuestionBox';
import InfoPage from '../../Pages/InfoPage/InfoPage';
import Section from '../../Components/Section/Section ';
import PrivateChat from '../../Components/PrivateChat/PrivateChat';
import { questions1 } from '../../data/questions1';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';
import { db } from '../../firebase';
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
// import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';

export default function QuestionsPage_1() {
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  // const [historyQuestion, setHistoryQuestion] = useState([]);
  const { chatId, otherUserEmail } = useSelector(state => state.chat);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       return;
  //     } else {
  //       navigate('/sing');
  //     }
  //   });
  // });

  const rundomaizer = max => {
    let rundomNumber;

    while (usedNumbers.length <= max) {
      rundomNumber = Math.floor(Math.random() * max);

      if (usedNumbers.indexOf(rundomNumber) === -1) {
        setUsedNumbers(prev => [...prev, rundomNumber]);
        return rundomNumber;
      } else if (usedNumbers.length === max) {
        return toast('Вы выжали максимум с этой категории вопросов');
      }
    }
  };

  const onClik = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setQuestions(questions1[rundomaizer(questions1.length)]);
      setLoading(false);
      // setHistoryQuestion(prev => [...prev, questions]);
    }, 1000);
    setQuestions('');
    setCounter(prev => prev + 1);
  };

  const cleanOll = () => {
    setQuestions('');
    setCounter(0);
    setUsedNumbers([]);
  };

  const sendQuestions = async () => {
    const chatsRef = collection(db, 'chats');
    const chatRef = doc(chatsRef, chatId);
    const messagesRef = collection(chatRef, 'messages');

    if (questions) {
      await addDoc(messagesRef, {
        text: questions,
        createdAt: serverTimestamp(),
        // photo,
        // userName: name,
        // userEmail: email,
      });
      setQuestions('');
    } else {
      console.log('gecnj');
      return;
    }
  };

  return (
    <>
      <main className={s.main}>
        <Container>
          {loading && <Loading />}
          <Section className={'section-hero'}>
            <QuestionBox questions={questions} title={'Обычние вопросы'} />
            {/* <QuestionBoxHistory historyQuestion={historyQuestion} /> */}
          </Section>
          {chatId ? (
            <PrivateChat
              chatId={chatId}
              otherUserEmail={otherUserEmail}
              questions={questions}
            />
          ) : (
            <InfoPage />
          )}
        </Container>
      </main>
      <Footer counter={counter} onClik={onClik} cleanOll={sendQuestions} />
      <ToastContainer />
    </>
  );
}
