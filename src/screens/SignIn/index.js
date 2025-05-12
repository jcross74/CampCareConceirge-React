import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";

// Import Firebase Auth functions and your app initialization
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase"; // Adjust the path if necessary
import { getDoc, setDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const SignIn = () => {
  const heightWindow = use100vh();
  const navigate = useNavigate();
  const auth = getAuth(app); // Initialize the Firebase Auth instance

  // State for controlled form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for email/password sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in user:", userCredential.user);
      // Redirect after successful sign in
      navigate("/");
      // Write user UID to cookie
      document.cookie = `userUID=${userCredential.user.uid}; path=/;`;
      console.log("Cookie set: userUID=" + userCredential.user.uid);
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  // Handler for Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google signed in user:", result.user);
      navigate("/");
      // Check if user exists in Firestore and create if not
      const q = query(collection(db, "users"), where("authID", "==", result.user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const newUserRef = doc(db, "users", result.user.uid);
        await setDoc(newUserRef, {
          authID: result.user.uid,
          avatar: "",
          email: result.user.email,
          memberSince: new Date(),
          nameFirst: "",
          nameLast: "",
          role: "3",
        });
        console.log("New user record created in Firestore.");
      }
      // Write user UID to cookie
      document.cookie = `userUID=${result.user.uid}; path=/;`;
      console.log("Cookie set: userUID=" + result.user.uid);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage("Unable to sign in with Google. Please try again.");
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
              <img src="/images/content/google.svg" alt="Google" />
              Google
            </button>
            <button className={cn("button-stroke", styles.button)}>
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
            <button className={cn("button", styles.button)} type="submit">
              Sign in
            </button>
          </form>
          {errorMessage && <div className="login-feedback">{errorMessage}</div>}
          <div className={styles.note}>
            This site is protected by reCAPTCHA and the Google Privacy Policy.
          </div>
          <div className={styles.info}>
            Don’t have an account?{" "}
            <Link className={styles.link} to="/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;