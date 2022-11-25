import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDPX3ol__wm_JWJZaDLpeiaymw9daYFzek",
  authDomain: "secretsanta-577bf.firebaseapp.com",
  databaseURL: "https://secretsanta-577bf-default-rtdb.firebaseio.com",
  projectId: "secretsanta-577bf",
  storageBucket: "secretsanta-577bf.appspot.com",
  messagingSenderId: "850113399246",
  appId: "1:850113399246:web:2123601b68095e72a8c39f",
  measurementId: "G-DGSZN6MQHF"
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);