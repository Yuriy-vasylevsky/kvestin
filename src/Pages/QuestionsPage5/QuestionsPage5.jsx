/* eslint-disable no-loop-func */

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from '../../Components/Container/Container';
import Footer from '../../Components/Footer/Footer';
import Loader from '../../Components/Loader/Loader';
import QuestionBox from '../../Components/QuestionBox/QuestionBox';
import InfoPage from '../InfoPage/InfoPage';
import Section from '../../Components/Section/Section ';
import PrivateChat from '../../Components/PrivateChat/PrivateChat';

import { questions5 } from '../../data/questions5';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function QuestionsPage_1() {
  const [usedNumbers, setUsedNumbers] = useState(
    localStorage.getItem(`questions5`)
      ? localStorage
          .getItem(`questions5`)
          .split(',')
          .map(function (item) {
            return parseInt(item, 10);
          })
      : [],
  );

  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const { chatId, otherUserEmail, otherUserName } = useSelector(
    state => state.chat,
  );

  // Рандомайзер для отримання випадкового числа що не повторюється

  const rundomaizer = max => {
    let rundomNumber;

    while (usedNumbers.length <= max) {
      rundomNumber = Math.floor(Math.random() * max);

      if (usedNumbers.indexOf(rundomNumber) === -1) {
        setUsedNumbers(prev => [...prev, rundomNumber]);
        localStorage.setItem(`questions5`, usedNumbers);
        return rundomNumber;
      } else if (usedNumbers.length === max) {
        setUsedNumbers([]);
        return toast('Ви пройшли всі запитання. Починаємо все з початку.');
      }
    }
  };

  // Вибираємо рандомне запитання

  const changeQuestion = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setQuestions(questions5[rundomaizer(questions5.length)]);
      setLoading(false);
    }, 500);
    setQuestions('');
  };

  return (
    <>
      <main className="main">
        <Container>
          {chatId && (
            <Section className={'section-hero'}>
              {loading && <Loader />}
              <QuestionBox questions={questions} title={'Обычние вопросы'} />
            </Section>
          )}

          {chatId ? (
            <PrivateChat
              chatId={chatId}
              otherUserEmail={otherUserEmail}
              questions={questions}
              otherUserName={otherUserName}
            />
          ) : (
            <InfoPage />
          )}
        </Container>
      </main>
      <Footer
        chatId={chatId}
        changeQuestion={changeQuestion}
        questions={questions}
      />

      <ToastContainer />
    </>
  );
}
