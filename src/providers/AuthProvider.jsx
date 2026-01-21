import { Children, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axiosSecure from "../api/axiosSecure";
import axiosPublic from "../api/axiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  //track User
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setDbUser(null);
      }

      setLoading(false);
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    // wake server first
    axiosPublic.get("/health").catch(() => {});
  }, []);

  // register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //user update
  const updateUser = (name, imageUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageUrl,
    });
  };

  //re fresh user data
  const refreshUser = () => {
    setUser({ ...auth.currentUser });
  };

  // for refetch dbUser data
  const refetchProfile = async (retry = 0) => {
    if (!auth.currentUser) return;

    try {
      const res = await axiosSecure.get("/profile", {
        timeout: 60000,
      });
      setDbUser(res.data);
    } catch (err) {
      if (retry < 5) {
        setTimeout(() => refetchProfile(retry + 1), 3000);
        return;
      }
      console.log("Profile refetch failed", err);
      // setDbUser(null);
    }
  };

    useEffect(() => {
      if (user) {
        refetchProfile();
      }
    }, [user]);

  // login
  const loginUser = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);

    // wait for server to set token cookie and then fetch profile
    await refetchProfile();

    return result;
  };

  //logout
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    await axiosSecure.post("/logout");
    setUser(null);
    setDbUser(null);
    setLoading(false);
    // return result;
  };

  const userInfo = {
    user,
    dbUser,
    loading,
    registerUser,
    updateUser,
    loginUser,
    logOut,
    refreshUser,
    refetchProfile,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};;

export default AuthProvider;
