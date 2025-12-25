import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 YOUR REAL FIREBASE CONFIG (CONFIRMED)
const firebaseConfig = {
  apiKey: "AIzaSyBQEWwSWJMXFHKlgaJWiYJmEI9uGEnydjk",
  authDomain: "quantum-leap-admin.firebaseapp.com",
  projectId: "quantum-leap-admin",
  storageBucket: "quantum-leap-admin.firebasestorage.app",
  messagingSenderId: "962200773718",
  appId: "1:962200773718:web:3d3f17f7877460dc66c7f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 AUTH (WITH PERSISTENCE)
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// 🗄️ FIRESTORE
export const db = getFirestore(app);

// DEBUG (KEEP THIS)
console.log("🔥 Firebase Project:", app.options.projectId);
