// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDbOPIECUYb05h3nmldoRWVYcm0Pb3kIk",
  authDomain: "adventure-auth-c6a6a.firebaseapp.com",
  projectId: "adventure-auth-c6a6a",
  storageBucket: "adventure-auth-c6a6a.firebasestorage.app",
  messagingSenderId: "978029483588",
  appId: "1:978029483588:web:aeedcf151bf7973ecc8e11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;