// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-d82a3.firebaseapp.com",
  projectId: "estate-d82a3",
  storageBucket: "estate-d82a3.firebasestorage.app",
  messagingSenderId: "18639902582",
  appId: "1:18639902582:web:76b391573e789684c48c57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);