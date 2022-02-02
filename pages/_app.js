import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase/firebase";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="font-nunito">
      <Navbar user={user} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
