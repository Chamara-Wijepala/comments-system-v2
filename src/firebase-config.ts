import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTQG9h_lLQ3pMyZdJ1CaqPaiwKGXDpMxs",
  authDomain: "comments-system-v2.firebaseapp.com",
  projectId: "comments-system-v2",
  storageBucket: "comments-system-v2.appspot.com",
  messagingSenderId: "1010482457890",
  appId: "1:1010482457890:web:b707d59ecf828d2be4c97b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
