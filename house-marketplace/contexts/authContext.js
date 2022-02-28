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
  addDoc,
  // updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
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

  const fetchListings = async (categoryName) => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        where("type", "==", categoryName),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return listings;
    } catch (err) {
      toast.error("Could not fetch listings");
      return [];
    }
  };

  const fetchOffers = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return listings;
    } catch (err) {
      toast.error("Could not fetch listings");
      return [];
    }
  };

  const memoizedFetchListings = useCallback(async (categoryName) => {
    const listings = await fetchListings(categoryName);
    return listings;
  }, []);

  const memoizedFetchOffers = useCallback(async () => {
    const offers = await fetchOffers();
    return offers;
  }, []);

  async function _storeUserData(name, email, uid) {
    const formData = { name, email, timestamp: serverTimestamp() };
    await setDoc(doc(db, "users", uid), formData);
  }

  const _storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${getAuth(app).currentUser.uid}-${
        image.name
      }-${uuidv4()}`;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const fetchImgUrls = async (images) => {
    const imgUrls = await Promise.all(
      [...images].map((image) => _storeImage(image))
    ).catch((err) => {
      toast.error("Image upload failed");
      console.log("Image upload error", err);
      return [];
    });
    return imgUrls;
  };

  const createListing = async (formData, imgUrls) => {
    try {
      const listing = {
        ...formData,
        imgUrls,
        timestamp: serverTimestamp(),
      };

      delete listing.images;
      !listing.offer && delete listing.discountedPrice;
      const docRef = await addDoc(collection(db, "listings"), listing);
      toast.success("Listing Saved");
      router.push(`category/${listing.type}/${docRef.id}`);
    } catch (err) {
      toast.error("Failed to save listing");
    }
  };

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
        memoizedFetchListings,
        memoizedFetchOffers,
        fetchImgUrls,
        createListing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 *
 * @returns {Object} user, error, signup, login, logout, update, resetPassword, googleOAuth, memoizedFetchListings, memoizedFetchOffers, fetchImgUrls, createListing
 */
export const useAuthContext = () => useContext(AuthContext);
