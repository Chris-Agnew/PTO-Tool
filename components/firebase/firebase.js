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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
    })
    .catch(error => {
      console.log(error);
    });
};

// const app = firebase.default.initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const provider = new firebase.GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then(result => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePic", profilePic);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth;
// const provider = new auth.GoogleAuthProvider();

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then(result => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePic", profilePic);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
