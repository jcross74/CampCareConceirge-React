import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";

const items = [
  
  {
    menu: [
      {
        title: "Settings",
        url: "admin/settings",
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
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful. Redirect to the site's root.
        navigate("/");
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
          <img src="/images/avatar-menu.png" alt="Avatar" />
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