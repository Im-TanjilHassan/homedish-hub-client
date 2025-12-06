import { Children, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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
    
    const refreshUser = () => {
      setUser({ ...auth.currentUser });
    };

  //logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //track User
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSub();
  }, []);

  const userInfo = {
    user,
    loading,
    registerUser,
    updateUser,
    logOut,
    refreshUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
