// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrOM_Eeit4TJ54mhE21vML6dqiLoZ4JFQ",
  authDomain: "campcare-react.firebaseapp.com",
  projectId: "campcare-react",
  storageBucket: "campcare-react.firebasestorage.app",
  messagingSenderId: "948944193334",
  appId: "1:948944193334:web:ea18d0c7e95829de801597",
  measurementId: "G-JKXFRD751S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db };
export default firebaseConfig;

