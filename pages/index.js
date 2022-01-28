import { auth, provider } from "../components/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
export default function Home() {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user.displayName);
        setEmail(result.user.email);
        setProfilePhoto(result.user.photoURL);
        setUid(result.user.uid);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar photo={profilePhoto} />
      <div>
        <button onClick={signInWithGoogle}>Sign in</button>
      </div>
      <Footer />
    </div>
  );
}
