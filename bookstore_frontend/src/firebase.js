// // // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCvlJrE0c91Sd6mLzRatQ1knuDvaW99bLc",
//   authDomain: "ecommerce-ba1b5.firebaseapp.com",
//   projectId: "ecommerce-ba1b5",
//   storageBucket: "ecommerce-ba1b5.appspot.com",
//   messagingSenderId: "1002213835166",
//   appId: "1:1002213835166:web:8a6651ddff85ff1baa168f",
//   measurementId: "G-2VBTS0EQMB"
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlJrE0c91Sd6mLzRatQ1knuDvaW99bLc",
  authDomain: "ecommerce-ba1b5.firebaseapp.com",
  projectId: "ecommerce-ba1b5",
  storageBucket: "ecommerce-ba1b5.appspot.com",
  messagingSenderId: "1002213835166",
  appId: "1:1002213835166:web:8a6651ddff85ff1baa168f",
  measurementId: "G-2VBTS0EQMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();