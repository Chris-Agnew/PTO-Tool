import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCC2j4lpDYOEZMwIAsD6sWcWj9ziZr3xl0',
  authDomain: 'arv-pto.firebaseapp.com',
  projectId: 'arv-pto',
  storageBucket: 'arv-pto.appspot.com',
  messagingSenderId: '1096751400437',
  appId: '1:1096751400437:web:a58cde33e940a9dd378cbc',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const provider = new GoogleAuthProvider()
export { db, auth, provider }

export const SignInWithGoogle = async () => {
  signInWithPopup(auth, provider).then((cred) => {
    setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
    }).catch((error) => {
      console.log(error)
    })
  })
}

export const googleSignOut = () => {
  auth.signOut()
}

export const colRef = collection(db, 'days')
