import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// import { getFunctions } from 'firebase/functions';

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
// const functions = getFunctions(app);

// const getAllUsers = httpsCallable(functions, 'getAllUsers');
// getAllUsers()
//   .then(result => {
//     console.log(result.data); // Відображаємо список користувачів у консолі
//   })
//   .catch(error => {
//     console.log(error); // Відображаємо помилку у консолі
//   });

// const header = new Headers({
//   'Access-Control-Allow-Origin': ' http://localhost:3000',
// });

// fetch('https://us-central1-questions-react.cloudfunctions.net/getAllUsers', {
//   mode: 'cors',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//   },
// })
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(error => {
//     console.log('error:', error);
//   });

export { db, app, database, auth };
