import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnXO0qH9IP5om4XQ4Pdp9UF81ebZZnVDc",
  authDomain: "sparout-project.firebaseapp.com",
  projectId: "sparout-project",
  storageBucket: "sparout-project.firebasestorage.app",
  messagingSenderId: "38261655812",
  appId: "1:38261655812:web:9bfea66053e784ef696851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
