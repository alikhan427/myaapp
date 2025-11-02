// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-S9t42Mn55wDDJYxrPtRjf_vphQOmvDY",
  authDomain: "my-app-3d9b3.firebaseapp.com",
  databaseURL: "https://my-app-3d9b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-app-3d9b3",
  storageBucket: "my-app-3d9b3.appspot.com", // ✅ FIXED (was wrong before)
  messagingSenderId: "1036934792117",
  appId: "1:1036934792117:web:b4a7df72e303e4255c8ffc",
  measurementId: "G-65FEWGC87R"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Get Realtime Database reference
export const db = getDatabase(app);
