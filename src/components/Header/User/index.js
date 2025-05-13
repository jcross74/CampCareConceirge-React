import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";
import Cookies from "js-cookie";

const items = [
    {
        menu: [
            {
                title: "Home",
                url: "../",
            },

        ],
    },
    {
        menu: [
            {
                title: "Admin Dashboard",
                url: "/admin/",
            },

        ],
    },
   
    {
        menu: [
            {
                title: "Profile",
                url: "/admin/settings",
            },
            {
                title: "Logout",
            },
        ],
    },
];

const User = ({ className }) => {
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.user, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={styles.head}
                    onClick={() => setVisible(!visible)}
                >
                    <img src="/images/avatar-menu.png" alt="Avatar" />
                </button>
                <div className={styles.body}>
                    {items.map((item, index) => (
                        <div className={styles.menu} key={index}>
                            {item.menu.map((x, index) =>
                                x.url ? (
                                    <NavLink
                                        className={cn(styles.item, {
                                            [styles.color]: x.color,
                                            [styles.active]: pathname === x.url,
                                        })}
                                        to={x.url}
                                        onClick={() => setVisible(false)}
                                        key={index}
                                    >
                                        {x.icon && (
                                            <Icon name={x.icon} size="24" />
                                        )}
                                        {x.title}
                                    </NavLink>
                                ) : (
                                    <button
                                        className={styles.item}
                                        onClick={() => {
                                            setVisible(false);
                                            const auth = getAuth();
                                            signOut(auth)
                                                .then(() => {
                                                    Cookies.remove("UserUID");
                                                    Cookies.remove("role");
                                                    navigate("/");
                                                })
                                                .catch((error) => {
                                                    console.error("Error signing out:", error);
                                                });
                                        }}
                                        key={index}
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
