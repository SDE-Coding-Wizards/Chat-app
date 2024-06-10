// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import getConfig from "next/config";

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

const firebaseConfig = {
  apiKey: serverRuntimeConfig.FIREBASE_APIKEY || publicRuntimeConfig.FIREBASE_APIKEY,
  authDomain: serverRuntimeConfig.FIREBASE_AUTHDOMAIN || publicRuntimeConfig.FIREBASE_AUTHDOMAIN,
  projectId: serverRuntimeConfig.FIREBASE_PROJECTID || publicRuntimeConfig.FIREBASE_PROJECTID,
  storageBucket: serverRuntimeConfig.FIREBASE_STORAGEBUCKET || publicRuntimeConfig.FIREBASE_STORAGEBUCKET,
  messagingSenderId: serverRuntimeConfig.FIREBASE_MESSAGINGSENDERID || publicRuntimeConfig.FIREBASE_MESSAGINGSENDERID,
  appId: serverRuntimeConfig.FIREBASE_APPID || publicRuntimeConfig.FIREBASE_APPID,
  measurementId: serverRuntimeConfig.FIREBASE_MEASUREMENTID || publicRuntimeConfig.FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
