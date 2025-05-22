import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const DEFAULT_AVATAR = "/images/avatar-menu.png";
const AVATAR_CACHE_KEY = "user_avatar_url";

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
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem(AVATAR_CACHE_KEY) || DEFAULT_AVATAR;
  });

  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);

      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const avatarUrl = data.avatar || DEFAULT_AVATAR;
              setAvatar(avatarUrl);
              localStorage.setItem(AVATAR_CACHE_KEY, avatarUrl);
            } else {
              setAvatar(DEFAULT_AVATAR);
              localStorage.removeItem(AVATAR_CACHE_KEY);
            }
          },
          (error) => {
            console.error("Failed to listen for user avatar changes:", error);
            setAvatar(DEFAULT_AVATAR);
            localStorage.removeItem(AVATAR_CACHE_KEY);
          }
        );

        return () => unsubscribeSnapshot();
      } else {
        setAvatar(DEFAULT_AVATAR);
        localStorage.removeItem(AVATAR_CACHE_KEY);
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

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
    signOut(auth)
      .then(() => {
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userUID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
          <img src={avatar} alt="Avatar" />
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