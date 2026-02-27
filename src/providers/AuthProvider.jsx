import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

/**
 * Provides authentication context to the application using Firebase.
 * Includes email/password login, registration, and session persistence.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Registers a new user with the provided email and password.
   */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * Authenticates a user with email and password.
   * Modifies Firebase persistence based on "rememberMe" selection.
   */
  const loginUser = (email, password, rememberMe = true) => {
    setLoading(true);
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    
    return setPersistence(auth, persistenceType)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  /**
   * Signs out the currently authenticated user.
   */
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  /**
   * Simulates an API login based on custom endpoints.
   */
  const mockApiLogin = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const endpoint = `${apiUrl}/api/login`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      return await response.json();
    } catch (error) {
      console.error("API login failed", error);
      throw error;
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
    mockApiLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
