import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDocs, getFirestore, collection } from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      signInWithPopup(auth, provider);
    })
    .then(() => {
      console.log("signed in");
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const googleSignOut = () => {
  auth.signOut();
};

const colRef = collection(db, "users");
getDocs(colRef).then(snapshot => {
  let users = [];
  snapshot.docs.forEach(doc => {
    users.push({ ...doc.data(), id: doc.id });
  });
  console.log(users);
});
