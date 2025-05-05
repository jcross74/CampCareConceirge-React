import React, { useState } from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import TextInput from "../../../components/TextInput";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const Code = () => {
  const navigate = useNavigate();
  const [passwordCreate, setPasswordCreate] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("signupEmail");
    if (!email || passwordCreate !== passwordVerify) {
      alert("Passwords do not match or email is missing.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, passwordCreate);
      const user = userCredential.user;

      // Create Firestore record first
      await setDoc(doc(db, "users", user.uid), {
        authID: user.uid,
        avatar: "",
        email: user.email,
        memberSince: serverTimestamp(),
        nameFirst: "",
        nameLast: "",
        role: "3"
      });

      // Redirect to root
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          Create a password for your account.
        </div>
       
        <form onSubmit={handleSubmit}>
            <TextInput
              className={styles.field}
              name="password-create"
              type="password"
              placeholder="Enter Password"
              required
              icon="lock"
              value={passwordCreate}
              onChange={(e) => setPasswordCreate(e.target.value)}
            />
            <TextInput
              className={styles.field}
              name="password-verify"
              type="password"
              placeholder="Re-enter Password"
              required
              icon="lock"
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
            />
            <button className={cn("button", styles.button)} type="submit">
              <Loader className={styles.loader} white />
              <span>Continue</span>
            </button>
          </form>
         
        
        <div className={styles.errorNote}>
          The code you entered is incorrect.
        </div>
        
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Code;
