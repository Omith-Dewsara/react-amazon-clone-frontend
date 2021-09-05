import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClEXYS7Jwmsq9AAxgMlqjp6NULpDcJXWM",
  authDomain: "clone-4a76c.firebaseapp.com",
  projectId: "clone-4a76c",
  storageBucket: "clone-4a76c.appspot.com",
  messagingSenderId: "350483329899",
  appId: "1:350483329899:web:cc9c69d8b68469605c922e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }