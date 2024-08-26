// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnWZsjYBsRBkDR8yIbPcxmyPdWuDU1zVU",
  authDomain: "books-fe703.firebaseapp.com",
  projectId: "books-fe703",
  storageBucket: "books-fe703.appspot.com",
  messagingSenderId: "846683287654",
  appId: "1:846683287654:web:8fd2dd2da8e3d21a4b7da7",
  measurementId: "G-BH2JZLQQP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);  

// Initialize Firestore
const fireDB = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { fireDB, auth, analytics, logEvent, storage };

