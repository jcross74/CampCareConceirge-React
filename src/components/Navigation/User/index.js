import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";

const items = [
  {
    menu: [
      {
        title: "Profile",
        url: "/profile",
      },
      {
        title: "Your reviews",
        url: "/profile/reviews",
      },
    ],
  },
  {
    menu: [
      {
        title: "Account settings",
        url: "/settings",
      },
      {
        title: "Log out",
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

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
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
          <img src="/images/content/Avatar-User.png" alt="Avatar" />
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
                      if (x.title === "Log out") {
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