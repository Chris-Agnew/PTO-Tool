import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signInWithGoogle, auth } from "../components/firebase/firebase";
import "firebase/auth";
import { useState } from "react";

export default function Home() {
  const [profilePic, setProfilePic] = useState("");

  const user = auth.currentUser;

  if (user != null) {
    setProfilePic(user.photoURL);
    console.log(profilePic);
  }
  return (
    <div>
      <Navbar photo={profilePic} />
      <div>
        <button onClick={signInWithGoogle}>Sign in</button>
      </div>
      <Footer />
    </div>
  );
}
