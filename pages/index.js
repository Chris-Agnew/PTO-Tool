import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../components/firebase/firebase";

export default function Home() {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  return (
    <div>
      <Navbar />
      <div>
        <button onClick={signInWithGoogle}>Sign in</button>
      </div>
      <Footer />
    </div>
  );
}
