// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnW0IYIXc2Tr_lqWNm1Hs9JH60BkRK4qc",
  authDomain: "equilibramais-gs.firebaseapp.com",
  projectId: "equilibramais-gs",
  storageBucket: "equilibramais-gs.firebasestorage.app",
  messagingSenderId: "169477820527",
  appId: "1:169477820527:web:d3db78ab416b9aa5763d9a",
  measurementId: "G-PNXK8XKPMG"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);