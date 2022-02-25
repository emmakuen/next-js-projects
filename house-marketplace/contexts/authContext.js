import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { app, db } from "../firebase";
import { routes } from "../lib/routes";
import { showError } from "../lib/errorMessages";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(
        getAuth(app),
        (user) => {
          setUser(user);
          setLoading(false);
        },
        setError
      );

    unsubscribe();
    return () => unsubscribe();
  }, []);

  /**
   * @description asynchronously signs up user
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

      // store user data in firestore users collection
      await _storeUserData(name, email, userCredential.user.uid);
      router.push(routes.explore);
    } catch (err) {
      showError(err);
    }
  };

  /**
   * @param {String} email
   * @param {String} password
   */
  const login = async (email, password) => {
    if (!email || !password) {
      return toast.error("Invalid credential");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      setUser(userCredential.user);
      router.push(routes.explore);
    } catch (err) {
      showError(err);
    }
  };

  const logout = async () => {
    try {
      await getAuth(app).signOut();
      router.push(routes.explore);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  /**
   * @description asynchronously updates user name
   * @param {String} name
   * @param {String} email
   */
  const update = async (name, email) => {
    try {
      const auth = getAuth(app);
      if (name === user.displayName) return;
      // update display name
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // set or update firestore users collection
      await _storeUserData(name, email, auth.currentUser.uid);

      // // update only
      // const userRef = doc(db, "users", auth.currentUser.uid);
      // await updateDoc(userRef, { name });
    } catch (err) {
      console.log(err);
      toast.error("Could not update profile details");
    }
  };

  /**
   * @param {String} email
   */
  const resetPassword = async (email) => {
    if (!email) {
      return toast.error("Insert your email to reset your password");
    }
    try {
      await sendPasswordResetEmail(getAuth(app), email);
      toast.success("Email was sent");
      router.push(routes.login);
    } catch (err) {
      toast.error("Could not send reset email");
    }
  };

  const googleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(app), provider);
      const user = result.user;

      // check if user is registered
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // if not, register user
      if (!docSnap.exists()) {
        await _storeUserData(user.displayName, user.email, user.uid);
      }
      router.push(routes.explore);
    } catch (err) {
      toast.error("Could not authorize with Google");
      console.log(err);
    }
  };

  async function _storeUserData(name, email, uid) {
    const formData = { name, email, timestamp: serverTimestamp() };
    await setDoc(doc(db, "users", uid), formData);
  }

  return loading ? (
    <Loader />
  ) : (
    <AuthContext.Provider
      value={{
        user,
        error,
        signup,
        login,
        logout,
        update,
        resetPassword,
        googleOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
