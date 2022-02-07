import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext({});
import { getAuth } from "firebase/auth";
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "./firebase";
import Loading from "./Loading";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async user => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);

      console.log("token", token);
      console.log("user", user);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center">
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};
export const useAuth = () => useContext(AuthContext);
