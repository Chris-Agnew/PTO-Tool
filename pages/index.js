import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signInWithGoogle, auth } from "../components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  // const [users, usersLoading, usersError] = useCollection(
  //   firebase.firestore().collection("users")
  // );
  // if (!usersLoading && users) {
  //   craftBlock.docs.map(doc => console.group(doc.data()));
  // }

  console.log("Loading:", loading, "|", "Current User:", user);
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
