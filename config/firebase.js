// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
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
export const db = getFirestore(app);
export const auth = getAuth(app)


export default app;