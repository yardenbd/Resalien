import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Authentication/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { sendEmailVerification } from "@firebase/auth";

export const AuthContext = createContext({
  register: () => {},
  sendEmailToVerify: () => {},
  login :()=>{}
});
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const register = async (registerEmail, registerPassword) => {
    return await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
  };
  const sendEmailToVerify = async () => {
    return  await sendEmailVerification(auth.currentUser);
  };
  const login = async (email,password) => {
   return await signInWithEmailAndPassword(auth,email,password)
  };

  // const logout = async () => {
  //   await signOut(auth);
  // };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  return (
    <AuthContext.Provider value={{ register, sendEmailToVerify,login }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
