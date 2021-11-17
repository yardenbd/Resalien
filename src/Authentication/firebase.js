import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLy2KwHDhX-q03A8SP3DdhVNzL1DBgqMs",
  authDomain: "resalein-6f4f5.firebaseapp.com",
  projectId: "resalein-6f4f5",
  storageBucket: "resalein-6f4f5.appspot.com",
  messagingSenderId: "272052601888",
  appId: "1:272052601888:web:521197be4ef134293e6845",
  measurementId: "G-PEDQ7TMQHB"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
