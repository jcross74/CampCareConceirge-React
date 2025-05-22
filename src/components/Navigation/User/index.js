import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Cookies from "js-cookie";

const DEFAULT_AVATAR = "/images/avatar-menu.png";
const AVATAR_CACHE_KEY = "user_avatar_url";

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem(AVATAR_CACHE_KEY) || DEFAULT_AVATAR;
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const storage = getStorage();
    const userDocRef = doc(db, "users", user.uid);

    const fetchAvatarUrl = async (avatarField) => {
      if (!avatarField) {
        setAvatarUrl(DEFAULT_AVATAR);
        localStorage.removeItem(AVATAR_CACHE_KEY);
        return;
      }

      if (avatarField.startsWith("http")) {
        // Full URL, cache bust
        const url = `${avatarField}?t=${Date.now()}`;
        setAvatarUrl(url);
        localStorage.setItem(AVATAR_CACHE_KEY, url);
      } else {
        try {
          const storageRef = ref(storage, avatarField);
          const url = await getDownloadURL(storageRef);
          const cacheBustedUrl = `${url}?t=${Date.now()}`;
          setAvatarUrl(cacheBustedUrl);
          localStorage.setItem(AVATAR_CACHE_KEY, cacheBustedUrl);
        } catch (err) {
          console.error("Error getting download URL for avatar:", err);
          setAvatarUrl(DEFAULT_AVATAR);
          localStorage.removeItem(AVATAR_CACHE_KEY);
        }
      }
    };

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          fetchAvatarUrl(data.avatar);
        } else {
          setAvatarUrl(DEFAULT_AVATAR);
          localStorage.removeItem(AVATAR_CACHE_KEY);
        }
      },
      (error) => {
        console.error("Failed to listen for avatar changes:", error);
        setAvatarUrl(DEFAULT_AVATAR);
        localStorage.removeItem(AVATAR_CACHE_KEY);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Cookies.remove("UserUID");
    Cookies.remove("role");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const items = [
    {
      menu: [
        {
          title: "Settings",
          url: "admin/settings",
        },
        {
          title: "Logout",
        },
      ],
    },
    {
      // New menu group for Admin Dashboard
      menu: [
        {
          title: "Admin Dashboard",
          url: "/admin",
        },
      ],
    },
  ];

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
                x.url ? (
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
                      if (x.title === "Logout") {
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