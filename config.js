import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBcjP0XIWOcNoOV5qgFIoKCaFZUeVKSN6I",
    authDomain: "fastalk-80f9d.firebaseapp.com",
    projectId: "fastalk-80f9d",
    storageBucket: "fastalk-80f9d.appspot.com",
    messagingSenderId: "1073412911680",
    appId: "1:1073412911680:web:44c8920119ccd2c71765a5"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();