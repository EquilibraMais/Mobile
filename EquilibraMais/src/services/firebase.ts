import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnMOIYIXc2Tr_lqWmHs9JH68BkRk4qc",
  authDomain: "equilibramais-gs.firebaseapp.com",
  projectId: "equilibramais-gs",
  storageBucket: "equilibramais-gs.firebasestorage.app",
  messagingSenderId: "169477820527",
  appId: "1:169477820527:web:d3db78ab416b9aa5763d9a",
  measurementId: "G-PNXK8XKPMG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
