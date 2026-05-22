import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axiosPublic from "../api/axiosPublic";
import { auth, googleProvider } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = useCallback((email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const loginUser = useCallback((email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const googleLogin = useCallback(() => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }, []);

  const updateUserProfile = useCallback((profile) => updateProfile(auth.currentUser, profile), []);

  const logOut = useCallback(async () => {
    setLoading(true);
    await axiosPublic.post("/logout");
    return signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      try {
        if (currentUser?.email) {
          await axiosPublic
            .post("/jwt", {
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
            })
            .catch(() => {});
          setUser(currentUser);
        } else {
          setUser(null);
          await axiosPublic.post("/logout").catch(() => {});
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      loginUser,
      googleLogin,
      updateUserProfile,
      logOut,
    }),
    [user, loading, createUser, loginUser, googleLogin, updateUserProfile, logOut]
  );

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
