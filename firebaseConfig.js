// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD08hb9RHbslPdUVl67ImiaP7_OH_T_O3A",
  authDomain: "tindev-linux.firebaseapp.com",
  projectId: "tindev-linux",
  storageBucket: "tindev-linux.appspot.com",
  messagingSenderId: "963463176931",
  appId: "1:963463176931:web:4335bb2e74524775fedbd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export { auth, db }