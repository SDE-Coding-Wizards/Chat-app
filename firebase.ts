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
  measurementId: "G-PS1L6SZDZH",
};

const testEnvFirebaseConfig = {
  apiKey: "AIzaSyBvb3WxL4jMuo4JoMc59EnshRe4Iect5ZM",
  authDomain: "test-environment-a880c.firebaseapp.com",
  projectId: "test-environment-a880c",
  storageBucket: "test-environment-a880c.appspot.com",
  messagingSenderId: "959195002158",
  appId: "1:959195002158:web:ebabe3df08d971afbff6bf",
  measurementId: "G-V0G4LX6WVG",
};

const app = initializeApp(
  process.env.NODE_ENV != "production" ? testEnvFirebaseConfig : firebaseConfig
);

export default app;

export const auth = getAuth(app);
