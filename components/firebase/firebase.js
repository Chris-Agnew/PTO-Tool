// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC2j4lpDYOEZMwIAsD6sWcWj9ziZr3xl0",
  authDomain: "arv-pto.firebaseapp.com",
  projectId: "arv-pto",
  storageBucket: "arv-pto.appspot.com",
  messagingSenderId: "1096751400437",
  appId: "1:1096751400437:web:a58cde33e940a9dd378cbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
