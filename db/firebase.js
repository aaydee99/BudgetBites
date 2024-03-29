// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCWk0AwljROfwIZhgasB7kWRtvGAY0B7FY",
  authDomain: "budgetbites-b4391.firebaseapp.com",
  projectId: "budgetbites-b4391",
  storageBucket: "budgetbites-b4391.appspot.com",
  messagingSenderId: "196566017336",
  appId: "1:196566017336:web:0822f8f1284b4ef87a8dcd",
  measurementId: "G-PEPDJ8W3CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore(app);

export {FIRESTORE_DB}