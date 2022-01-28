import firebase from "firebase";
require("firebase/auth");
import { initializeApp } from "firebase/app";
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch(error => {
      console.log(error);
    });
};
