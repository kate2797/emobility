/**
 * A module storing Firebase configuration.
 */
import { initializeApp } from "firebase/app"; // Reference: https://www.npmjs.com/package/firebase and https://firebase.google.com/docs/auth/web/start
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_SENDER_ID,
} from "../constants/secrets";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "msc-tool.firebaseapp.com",
  projectId: "msc-tool",
  storageBucket: "msc-tool.appspot.com",
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
