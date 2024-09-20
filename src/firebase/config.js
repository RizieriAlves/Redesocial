import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJVBbzvDiMr3_82Tui7sbPdDn1s1WDAhs",
  authDomain: "miniblog-c076d.firebaseapp.com",
  projectId: "miniblog-c076d",
  storageBucket: "miniblog-c076d.appspot.com",
  messagingSenderId: "1080395670487",
  appId: "1:1080395670487:web:cf7002caf6ba79a87ce192",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
