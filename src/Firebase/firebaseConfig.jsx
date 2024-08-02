// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtSmP1Z-gaKKL3sb_u1UkfFOx2otgblO4",
  authDomain: "fir-project-55800.firebaseapp.com",
  projectId: "fir-project-55800",
  storageBucket: "fir-project-55800.appspot.com",
  messagingSenderId: "759142693795",
  appId: "1:759142693795:web:47429f2481e0d1ecbef816",
  measurementId: "G-RZEK9W12C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const storage = getStorage();

const db = getFirestore(app)

export default db ;