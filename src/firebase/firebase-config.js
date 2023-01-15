
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const firebaseConfig = {

//   apiKey: "AIzaSyD9uveHHol4bMl3DviVhDgoXe48rIuHPkA",
//   authDomain: "e-commerce-dcfb1.firebaseapp.com",
//   projectId: "e-commerce-dcfb1",
//   storageBucket: "e-commerce-dcfb1.appspot.com",
//   messagingSenderId: "16952118469",
//   appId: "1:16952118469:web:5cb26f457afcded57d74ac"

// };

const firebaseConfig = {

  apiKey: "AIzaSyCOk5dm4P3TKXeRUuf-ACCfgqO2RFiOOsY",

  authDomain: "e-commerce-63f6d.firebaseapp.com",

  projectId: "e-commerce-63f6d",

  storageBucket: "e-commerce-63f6d.appspot.com",

  messagingSenderId: "813581752420",

  appId: "1:813581752420:web:28717dd78ae72cde05e771"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);

export default db;