import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCmykDGgZJ1bz8lnN-eGbGcmiiV_DhocBM",
  authDomain: "eshop-4f391.firebaseapp.com",
  projectId: "eshop-4f391",
  storageBucket: "eshop-4f391.appspot.com",
  messagingSenderId: "88981793997",
  appId: "1:88981793997:web:999d617a8c46ce3b728d84",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
