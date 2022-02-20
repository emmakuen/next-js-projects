import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { app, db } from "../firebase";
import { routes } from "../lib/routes";
import { showError } from "../lib/errorMessages";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(
        getAuth(app),
        (user) => {
          setUser(user);
          setLoading(false);
        },
        setError
      );
    };
    unsubscribe();

    return () => unsubscribe();
  }, []);

  /**
   * @param {String} name
   * @param {String} email
   * @param {String} password
   */
  const signup = async (name, email, password) => {
    const auth = getAuth(app);
    try {
      // register user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // store user data on db
      const formData = { name, email, timestamp: serverTimestamp() };
      await setDoc(doc(db, "users", userCredential.user.uid), formData);
      router.push(routes.explore);
    } catch (err) {
      const errorMessage = err.message.split(" ").pop();
      console.log(errorMessage);
      showError(errorMessage);
    }
  };

  /**
   * @param {String} email
   * @param {String} password
   */
  const login = (email, password) => {
    if (!email || !password) return toast.error("Invalid credential");
    signInWithEmailAndPassword(getAuth(app), email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push(routes.explore);
      })
      .catch((err) => {
        const errorMessage = err.message.split(" ").pop();
        showError(errorMessage);
      });
  };

  const logout = () => {
    getAuth(app).signOut();
    router.push(routes.explore);
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
