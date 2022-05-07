import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALZNwq8VeZJ0o323g2ToYbZPNgKLhKv30",
  authDomain: "beta-vocaccion-react.firebaseapp.com",
  projectId: "beta-vocaccion-react",
  storageBucket: "beta-vocaccion-react.appspot.com",
  messagingSenderId: "278546855877",
  appId: "1:278546855877:web:608f8b379561287d593dac"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { db, auth };
