// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtoXRBashTwArLcE3Kx4F4GJ9A7dEhkVM",
  authDomain: "insta-clone-7c5f5.firebaseapp.com",
  projectId: "insta-clone-7c5f5",
  storageBucket: "insta-clone-7c5f5.appspot.com",
  messagingSenderId: "426296373543",
  appId: "1:426296373543:web:8cefe42132e58f750db902",
  measurementId: "G-JZ7HG6560J",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
