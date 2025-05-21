import SidebarMain from "../SidebarMain";
import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./MainNavigation.module.sass";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from "../Icon";
import Messages from "./Messages";
import Notification from "./Notification";
import User from "./User";

const MainNavigation = ({ onOpen = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check user's authentication state using Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true if user exists, false otherwise
    });
    return () => unsubscribe();
  }, []);

const handleClick = () => {
  setIsSidebarOpen(!isSidebarOpen);
  onOpen();
};

  return (
    <>
      <header className={styles.header}>
        <button className={styles.burger} onClick={handleClick}></button>
        <div>
          <div className={styles.branding}>
          <Link to="/" className={styles.link}>
          <img src="images/CampCare_Logo.png" alt="Logo" className={styles.logo} />
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
            <Link className={styles.link} to="/sign-in">
              <img
                src="images/avatar-menu.png"
                alt="Sign In"
                width="40"
                height="40"
                style={{ borderRadius: "50%" }}
              />
            </Link>
          )}
        </div>
      </header>
      {isSidebarOpen && <SidebarMain onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default MainNavigation;