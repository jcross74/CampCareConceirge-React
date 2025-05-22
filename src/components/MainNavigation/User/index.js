import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

const User = ({ className }) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("user_avatar_url") || "/images/avatar-menu.png"
  );

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setAvatarUrl("/images/avatar-menu.png");
      localStorage.removeItem("user_avatar_url");
      return;
    }

    const userUID = auth.currentUser?.uid;
    if (!userUID) {
      setAvatarUrl("/images/avatar-menu.png");
      localStorage.removeItem("user_avatar_url");
      return;
    }

    const userDocRef = doc(db, "users", userUID);
    const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.avatar) {
          setAvatarUrl(data.avatar);
          localStorage.setItem("user_avatar_url", data.avatar);
        } else {
          setAvatarUrl("/images/avatar-menu.png");
          localStorage.removeItem("user_avatar_url");
        }
      } else {
        setAvatarUrl("/images/avatar-menu.png");
        localStorage.removeItem("user_avatar_url");
      }
    });

    return () => unsubscribeSnapshot();
  }, [isAuthenticated, auth.currentUser, db]);

  const role = getCookie("role");

  const items = isAuthenticated
    ? [
        {
          menu: [
            { title: "Profile", url: "/admin/settings" },
            ...(role === "1" ? [{ title: "Admin Dashboard", url: "/admin" }] : []),
            ...(role === "2" ? [{ title: "Camp Dashboard", url: "/admin" }] : []),
          ],
        },
        {
          menu: [{ title: "Logout", url: null }],
        },
      ]
    : [
        {
          menu: [
            { title: "Sign In", url: "/signin" },
            { title: "Sign Up", url: "/signup" },
          ],
        },
      ];

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Clear cookies before redirecting.
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userUID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem("user_avatar_url");
        // Sign-out successful. Redirect to the site's root.
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.user, className, {
          [styles.active]: visible,
        })}
      >
        <button className={styles.head} onClick={() => setVisible(!visible)}>
          <img src={avatarUrl} alt="Avatar" />
        </button>
        <div className={styles.body}>
          {items.map((item, index) => (
            <div className={styles.menu} key={index}>
              {item.menu.map((x, idx) =>
                x.url && x.title !== "Logout" ? (
                  <NavLink
                    className={cn(styles.item, {
                      [styles.color]: x.color,
                      [styles.active]: pathname === x.url,
                    })}
                    to={x.url}
                    onClick={() => setVisible(false)}
                    key={idx}
                  >
                    {x.icon && <Icon name={x.icon} size="24" />}
                    {x.title}
                  </NavLink>
                ) : (
                  <button
                    className={styles.item}
                    onClick={() => {
                      setVisible(false);
                      if (x.title === "Log out" || x.title === "Logout") {
                        handleLogout();
                      }
                    }}
                    key={idx}
                  >
                    {x.title}
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;