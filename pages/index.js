import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signInWithGoogle, auth } from "../components/firebase/firebase";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  console.group("Loading:", loading, "|", "Current User:", user);
  return (
    <div>
      <Navbar user={user} />
      <div>
        <button onClick={signInWithGoogle}>Sign in</button>
      </div>
      <Footer />
    </div>
  );
}
