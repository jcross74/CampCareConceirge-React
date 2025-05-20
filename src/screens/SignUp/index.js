// src/screens/SignUp/index.js
import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import Entry from "./Entry";
import Code from "./Code";
import Image from "../../components/Image";
import TextInput from "../../components/TextInput";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db, app } from "../../firebase";

const SignUp = () => {
  const [visible, setVisible] = useState(true);
  const heightWindow = use100vh();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Helper to finish signup: set user doc and navigate
  const finishSignUp = async (user, defaultRole) => {
    try {
      // Check if a user with this email already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email), limit(1));
      const snap = await getDocs(q);

      let role;
      if (snap.empty) {
        // No existing user: create a new doc keyed by UID
        role = defaultRole;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          authID: user.uid,
          avatar: "",
          email: user.email,
          memberSince: serverTimestamp(),
          nameFirst: "",
          nameLast: "",
          role,
        });
      } else {
        // User exists: reuse existing role
        const existing = snap.docs[0].data();
        role = existing.role;
      }

      // Set cookies and navigate
      document.cookie = `userUID=${user.uid}; role=${role}; path=/;`;
      navigate("/");
    } catch (err) {
      console.error("Error finalizing sign up:", err);
      setErrorMessage("An error occurred during sign-up. Please try again.");
    }
  };

  // Email/password signup
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await finishSignUp(user, "1");
    } catch (err) {
      console.error("Email sign-up error:", err);
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  // Google social signup
  const handleGoogleSignUp = async () => {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      await finishSignUp(user, "3");
    } catch (err) {
      console.error("Google sign-up error:", err);
      setErrorMessage("Error signing up with Google. Please try again.");
    }
  };

  // Apple social signup
  const handleAppleSignUp = async () => {
    try {
      const { user } = await signInWithPopup(auth, new OAuthProvider("apple.com"));
      await finishSignUp(user, "3");
    } catch (err) {
      console.error("Apple sign-up error:", err);
      setErrorMessage("Error signing up with Apple. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/logo-dark.png" alt="Camp Care Concierge" />
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

          {visible ? (
            <Entry
              onConfirm={() => setVisible(false)}
              onGoogleSignUp={handleGoogleSignUp}
              onAppleSignUp={handleAppleSignUp}
            />
          ) : (
            <form onSubmit={handleEmailSignUp}>
              <Code />
              <TextInput
                className={styles.field}
                name="email"
                type="email"
                placeholder="Your email"
                required
                icon="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                className={styles.field}
                name="password"
                type="password"
                placeholder="Password"
                required
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={cn("button", styles.button)}>
                Create Account
              </button>
            </form>
          )}

          {errorMessage && <div className={styles.loginFeedback}>{errorMessage}</div>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;