// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSPXSjtF96tUr3HmfBf3Qip8SWN0TpbqU",
  authDomain: "luminya-924de.firebaseapp.com",
  projectId: "luminya-924de",
  storageBucket: "luminya-924de.firebasestorage.app",
  messagingSenderId: "762100735801",
  appId: "1:762100735801:web:af5a606a59d2e3bdd192e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
