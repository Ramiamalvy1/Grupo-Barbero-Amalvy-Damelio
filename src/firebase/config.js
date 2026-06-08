import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBqp1yfqRJvcTxbhPiN0WyvQffE6QVi7TI",
  authDomain: "integrador-6c953.firebaseapp.com",
  projectId: "integrador-6c953",
  storageBucket: "integrador-6c953.firebasestorage.app",
  messagingSenderId: "513295007348",
  appId: "1:513295007348:web:d795f54b1fd0b46d439b21"
};

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();