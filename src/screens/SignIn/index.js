// src/screens/SignIn/index.js
import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import Modal from "../../components/Modal";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SignIn = () => {
  const heightWindow = use100vh();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const escHandler = useCallback(
    (e) => { if (e.keyCode === 27 && modalOpen) setModalOpen(false); },
    [modalOpen]
  );
  useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [escHandler]);

  // Finalize sign-in: write user doc if new, set cookie, navigate
  const finishSignIn = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      let role;
      if (snap.exists()) {
        role = snap.data().role;
      } else {
        role = "3";
        await setDoc(userRef, {
          authID: user.uid,
          avatar: "",
          email: user.email,
          memberSince: new Date(),
          nameFirst: "",
          nameLast: "",
          role,
        });
      }
      document.cookie = `userUID=${user.uid}; role=${role}; path=/;`;
      navigate("/");
    } catch (err) {
      console.error("Error finalizing sign in:", err);
      setErrorMessage("An error occurred during sign-in. Please try again.");
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) finishSignIn(user);
    });
    return unsubscribe;
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Sign in error:", err);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => {
      console.error("Google sign-in error:", err);
      setErrorMessage("Unable to sign in with Google. Please try again.");
    });

  const handleAppleSignIn = () =>
    signInWithPopup(auth, new OAuthProvider("apple.com")).catch((err) => {
      console.error("Apple sign-in error:", err);
      setErrorMessage("Unable to sign in with Apple. Please try again.");
    });

  const handleResetPassword = async () => {
    try {
      if (!resetEmail) { setErrorMessage("Please provide a valid email address."); return; }
      await sendPasswordResetEmail(auth, resetEmail);
      setInfoMessage(`Password reset email sent to ${resetEmail}.`);
      setErrorMessage("");
      setModalOpen(false);
    } catch (err) {
      console.error("Reset error:", err);
      setErrorMessage("Failed to send reset email. Please try again.");
      setInfoMessage("");
    }
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Camp Care Concierge"
          />
        </Link>
        <div className={cn("h2", styles.title)}>Sign in</div>

        <div className={styles.head}>
          <div className={styles.subtitle}>Sign in with your Social account</div>
          <div className={styles.btns}>
            <button onClick={handleGoogleSignIn} className={cn("button-stroke", styles.button)}>
              <img src="/images/content/google.svg" alt="Google" /> Google
            </button>
            <button onClick={handleAppleSignIn} className={cn("button-stroke", styles.button)}>
              <Image
                className={styles.pic}
                src="/images/content/apple-dark.svg"
                srcDark="/images/content/apple-light.svg"
                alt="Apple"
              />
              Apple ID
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.subtitle}>Or continue with email address</div>
          <form onSubmit={handleSubmit}>
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
              Sign in
            </button>
          </form>

          {errorMessage && <div className={styles.loginFeedback}>{errorMessage}</div>}
          {infoMessage && <div className={styles.loginFeedback}>{infoMessage}</div>}

          <div className={styles.note}>
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setModalOpen(true);
                setResetEmail(email);
                setErrorMessage("");
                setInfoMessage("");
              }}
            >
              Forgot Password?
            </button>
          </div>

          <div className={styles.info}>
            Don’t have a Camp Care Concierge account?{" "}
            <Link className={styles.link} to="/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3>Reset Password</h3>
          <TextInput
            className={styles.field}
            name="reset-email"
            type="email"
            placeholder="Your email"
            required
            icon="mail"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button className={cn("button", styles.button)} onClick={handleResetPassword}>
            Send Reset Email
          </button>
          {errorMessage && <div className={styles.loginFeedback}>{errorMessage}</div>}
          {infoMessage && <div className={styles.loginFeedback}>{infoMessage}</div>}
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;