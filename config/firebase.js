import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJA-YlU7VGyfYXmdrVVLPtJckGOirDp2w",
  authDomain: "react-native-restaurent-app.firebaseapp.com",
  projectId: "react-native-restaurent-app",
  storageBucket: "react-native-restaurent-app.appspot.com",
  messagingSenderId: "902232929715",
  appId: "1:902232929715:web:f5d647eda7bbeb56a007c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);

export { app, db, auth, storage };