import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBN2eWXSx9_GHnhFgvf1EGmUQItwZyKFIo",
  authDomain: "newtonschool-fe214.firebaseapp.com",
  projectId: "newtonschool-fe214",
  storageBucket: "newtonschool-fe214.appspot.com",
  messagingSenderId: "397331287032",
  appId: "1:397331287032:web:75ae45897e843c6f28240d",
  measurementId: "G-7CH23XNY58",
});

const db = firebaseApp.firestore();

export default db;
