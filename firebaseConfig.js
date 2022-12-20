import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCg-uZ0GH07B1OQEjmEQu-iyK_u9-FqKYE",
  authDomain: "secret-santa-60b8e.firebaseapp.com",
  databaseURL: "https://secret-santa-60b8e-default-rtdb.firebaseio.com",
  projectId: "secret-santa-60b8e",
  storageBucket: "secret-santa-60b8e.appspot.com",
  messagingSenderId: "63630209882",
  appId: "1:63630209882:web:7a3c136fc79daa17f1b963"
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);