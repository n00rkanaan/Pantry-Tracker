// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDJE1aPtVJYCKJRuHqcaQ_byQP9TPycfc",
  authDomain: "inventory-management-be1ab.firebaseapp.com",
  projectId: "inventory-management-be1ab",
  storageBucket: "inventory-management-be1ab.appspot.com",
  messagingSenderId: "678580200411",
  appId: "1:678580200411:web:bda33f9183485d1296fdfe",
  measurementId: "G-48L27YD56X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
