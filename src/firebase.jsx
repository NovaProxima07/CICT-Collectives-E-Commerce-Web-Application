// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ixprhA8wPYBXk5ik-O8_84EkHzklwX8",
  authDomain: "cict-e-commerce.firebaseapp.com",
  projectId: "cict-e-commerce",
  storageBucket: "cict-e-commerce.firebasestorage.app",
  messagingSenderId: "222588284349",
  appId: "1:222588284349:web:4d4c375564be4615e0f6d4",
  measurementId: "G-DZX6K31VHQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize GoogleAuthProvider
const provider = new GoogleAuthProvider();  // Google Auth provider

// Export necessary modules
export { auth, provider, db };
