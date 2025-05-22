import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Item from "../Item";
import TextInput from "../../../components/TextInput";
import Modal from "../../../components/Modal";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Login = ({ className }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSocialAlert, setShowSocialAlert] = useState(false);
  const [isSocialLogin, setIsSocialLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || "");
      const socialProviders = ["google.com", "apple.com"];
      const hasSocialProvider = user.providerData.some((p) =>
        socialProviders.includes(p.providerId)
      );
      if (hasSocialProvider) {
        setIsSocialLogin(true);
        setShowSocialAlert(true);
      }
    }
  }, []);

  const handlePasswordReset = async () => {
    setMessage(null);
    setError(null);

    if (isSocialLogin) {
      setShowSocialAlert(true);
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  // Hide the entire login UI if user logged in via social provider
  if (isSocialLogin) return (
    <>
      {showSocialAlert && (
        <Modal
          className={styles.modal}
          onClose={() => setShowSocialAlert(false)}
          title="Password Reset Unavailable"
        >
          <p>
            You are unable to reset your password because you are logged in with a social network account.
          </p>
          <button
            className={styles.modalCloseButton}
            onClick={() => setShowSocialAlert(false)}
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );

  return (
    <>
      <Item
        className={cn(styles.card, className)}
        title="Password Reset"
        classTitle="title-red"
      >
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <button
          className={styles.resetButton}
          onClick={handlePasswordReset}
          disabled={loading}
          type="button"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>

        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </Item>
    </>
  );
};

export default Login;