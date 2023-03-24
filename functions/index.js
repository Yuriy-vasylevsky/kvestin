// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('ЗАЄБАЛО');
// });

// exports.getAllUsers = functions.https.onRequest((req, res) => {
//   // Використовуємо Firebase Admin SDK для отримання списку всіх користувачів
//   admin
//     .auth()
//     .listUsers()
//     .then(userRecords => {
//       // const users = userRecords.map(userRecord => {
//       //   return {
//       //     uid: userRecord.uid,
//       //     email: userRecord.email,
//       //     displayName: userRecord.displayName,
//       //     photoURL: userRecord.photoURL,
//       //     providerId: userRecord.providerId,
//       //     lastSignInTime: userRecord.metadata.lastSignInTime,
//       //     creationTime: userRecord.metadata.creationTime,
//       //   };
//       // });

//       // Повертаємо список користувачів у відповідь
//       return res.send(userRecords);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).send('Could not get users');
//     });
// });

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   const original = req.query.text;

//   const writeResult = await admin
//     .firestore()
//     .collection('messages')
//     .add({ original: original });

//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

// exports.makeUppercase = functions.firestore
//   .document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;

//     functions.logger.log('Uppercasing', context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     return snap.ref.set({ uppercase }, { merge: true });
//   });
