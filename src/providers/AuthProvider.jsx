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

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

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

  // login
  const loginUser = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    
     await axiosSecure.post(
       "/login",
       { email: result.user.email }
    );

    try {
      const res = await axiosSecure.get("/profile");
      setDbUser(res.data);
    } catch (err) {
      setDbUser(null);
    }
    

    return result;
  };

  //logout
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    await axiosSecure.post("/logout");
    setUser(null);
    setDbUser(null)
    setLoading(false)
    // return result;
  };

  //track User
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      
      
       if (currentUser) {
         try {
           const res = await axiosSecure.get("/profile");
           setDbUser(res.data);
         } catch (err) {
           console.error("Profile fetch failed", err);
           setDbUser(null);
         }
       } else {
         setDbUser(null);
      }
      setUser(currentUser);
      setLoading(false);
      
    });
    return () => unSub();
  }, []);

  const userInfo = {
    user,
    dbUser,
    loading,
    registerUser,
    updateUser,
    loginUser,
    logOut,
    refreshUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
