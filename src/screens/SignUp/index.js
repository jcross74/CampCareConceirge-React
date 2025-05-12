import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import Entry from "./Entry";
import Code from "./Code";
import Image from "../../components/Image";

// Firebase imports
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase"; 

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];



const SignUp = () => {
  const [visible, setVisible] = useState(true);
  const heightWindow = use100vh();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

// Local state for email sign up
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");

// Handler for email/password sign up
const handleEmailSignUp = async (e) => {
  e.preventDefault();
  try {
    // Attempt to create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add a document in the "users" collection with the required fields
    await addDoc(collection(db, "users"), {
      authID: user.uid,
      avatar: "",
      email: user.email,
      memberSince: serverTimestamp(),
      role: "1",
    });

    // Redirect to the site's root after successful sign up
    navigate("/");
  } catch (error) {
    console.error("Error signing up with email:", error);
    setErrorMessage("Error signing up. Please try again.");
  }
};

// Handler for Google sign up
const handleGoogleSignUp = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Add a document in the "users" collection. In a real app, you might want to check if this user already exists.
    await addDoc(collection(db, "users"), {
      authID: user.uid,
      avatar: "",
      email: user.email,
      memberSince: serverTimestamp(),
      role: "3",
    });

    // Redirect to the site's root after successful Google sign up
    navigate("/");
  } catch (error) {
    console.error("Error signing up with Google:", error);
    setErrorMessage("Error signing up with Google. Please try again.");
  }
};

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/logo-dark.png" alt="Login" />
          </div>
          
          
        </div>
      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          <Link className={styles.logo} to="/">
            <Image
              className={styles.pic}
              src="/images/logo-dark.png"
              srcDark="/images/logo-light.png"
              alt="Camp Care Concierge"
            />
          </Link>
          <div className={styles.info}>
            Already a member?{" "}
            <Link className={styles.link} to="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={cn("h2", styles.title)}>Sign up</div>




          
          {visible ? <Entry onConfirm={() => setVisible(false)} /> : <Code />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
