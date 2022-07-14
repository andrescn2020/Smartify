
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {

  apiKey: "AIzaSyD9uveHHol4bMl3DviVhDgoXe48rIuHPkA",
  authDomain: "e-commerce-dcfb1.firebaseapp.com",
  projectId: "e-commerce-dcfb1",
  storageBucket: "e-commerce-dcfb1.appspot.com",
  messagingSenderId: "16952118469",
  appId: "1:16952118469:web:5cb26f457afcded57d74ac"

};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);

export default db;