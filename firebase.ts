// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr4dbfgAGxAZVB0G0vNPn_cZ9YYP0UAHg",
  authDomain: "sde-coding-wizards-chat-app.firebaseapp.com",
  projectId: "sde-coding-wizards-chat-app",
  storageBucket: "sde-coding-wizards-chat-app.appspot.com",
  messagingSenderId: "960771910390",
  appId: "1:960771910390:web:7a7a4b5b9cf24afdf79ad7",
  measurementId: "G-PS1L6SZDZH"
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
