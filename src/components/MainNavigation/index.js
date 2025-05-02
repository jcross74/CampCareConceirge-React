import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./MainNavigation.module.sass";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from "../Icon";
import Messages from "./Messages";
import Notification from "./Notification";
import User from "./User";

const MainNavigation = ({ onOpen }) => {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user's authentication state using Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true if user exists, false otherwise
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={handleClick}></button>
      <div>
        <div className={styles.branding}>
        <Link to="/" className={styles.link}>
            <p>Camp Care Concierge</p>
          </Link>
        </div>
      </div>
      <div className={styles.btns}>
        <Link className={styles.link} to="/about">
          About Us
        </Link>
        <Link className={styles.link} to="/find-camps">
          Find a Camp
        </Link>
        <Link className={styles.link} to="/resources">
          Resources
        </Link>
        <Link className={styles.link} to="/contact">
          Contact Us
        </Link>
        {isAuthenticated && <User className={styles.user} />}
        {/* Render Sign In button only if the user is not authenticated */}
        {!isAuthenticated && (
          <Link className={cn("button", styles.button)} to="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;