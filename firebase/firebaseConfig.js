// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKSgzOXGU-P8sFayoplyZxv8X8zqRrM3U",
  authDomain: "ecosnap-8edf5.firebaseapp.com",
  projectId: "ecosnap-8edf5",
  storageBucket: "ecosnap-8edf5.appspot.com",
  messagingSenderId: "361720098816",
  appId: "1:361720098816:web:901fdf73c5c1161ccbe8e5",
  measurementId: "G-GHMJHB0EEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;