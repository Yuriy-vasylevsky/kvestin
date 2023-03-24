import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCV4Ld8CXpgCtbiGTPe5_MCWD5_HKWtkKs',
  authDomain: 'questions-react.firebaseapp.com',
  databaseURL:
    'https://questions-react-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'questions-react',
  storageBucket: 'questions-react.appspot.com',
  messagingSenderId: '129956767124',
  appId: '1:129956767124:web:a1e04d96dd19111a511b81',
  measurementId: 'G-ZVBYFT725N',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// const helloWorld = httpsCallable(functions, 'helloWorld');
// console.log('helloWorld:', helloWorld);

const getAllUsers = httpsCallable(functions, 'getAllUsers');
getAllUsers()
  .then(result => {
    console.log(result); // Відображаємо список користувачів у консолі
  })
  .catch(error => {
    console.log(error); // Відображаємо помилку у консолі
  });

// getAllUsers()
//   .then(result => {
//     console.log(result); // Відображаємо список користувачів у консолі
//   })
//   .catch(error => {
//     console.log(error); // Відображаємо помилку у консолі
//   });

// helloWorld()
//   .then(result => {
//     console.log('result:', result);
//   })
//   .catch(error => {
//     console.log('error:', error);
//   });

const header = new Headers({ 'Access-Control-Allow-Origin': '*' });

fetch('https://us-central1-questions-react.cloudfunctions.net/getAllUsers', {
  header: header,
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => {
    console.log('error:', error);
  });

export { db, app, database, auth };
