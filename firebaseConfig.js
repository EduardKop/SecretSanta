import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBp9SHWUPbqiujMzAzuefmcGXkzDexblbk",
  authDomain: "secret-santa-7475d.firebaseapp.com",
  databaseURL: "https://secret-santa-7475d-default-rtdb.firebaseio.com",
  projectId: "secret-santa-7475d",
  storageBucket: "secret-santa-7475d.appspot.com",
  messagingSenderId: "64480027082",
  appId: "1:64480027082:web:3f4e6887701e01c39eaf33"
};



export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);