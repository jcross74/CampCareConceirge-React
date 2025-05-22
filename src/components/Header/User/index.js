import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { getAuth, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
    const [avatarUrl, setAvatarUrl] = useState(() => {
        return localStorage.getItem("user_avatar_url") || "/images/avatar-menu.png";
    });

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            setAvatarUrl("/images/avatar-menu.png");
            localStorage.removeItem("user_avatar_url");
            return;
        }
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        const storage = getStorage();

        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.avatar) {
                    // Check if avatar is a full URL or storage path
                    if (typeof data.avatar === "string") {
                        if (data.avatar.startsWith("http://") || data.avatar.startsWith("https://")) {
                            setAvatarUrl(data.avatar);
                            localStorage.setItem("user_avatar_url", data.avatar);
                        } else {
                            // Assume it's a storage path
                            const storageRef = ref(storage, data.avatar);
                            getDownloadURL(storageRef)
                                .then((url) => {
                                    setAvatarUrl(url);
                                    localStorage.setItem("user_avatar_url", url);
                                })
                                .catch(() => {
                                    setAvatarUrl("/images/avatar-menu.png");
                                    localStorage.removeItem("user_avatar_url");
                                });
                        }
                    } else {
                        setAvatarUrl("/images/avatar-menu.png");
                        localStorage.removeItem("user_avatar_url");
                    }
                } else {
                    setAvatarUrl("/images/avatar-menu.png");
                    localStorage.removeItem("user_avatar_url");
                }
            } else {
                setAvatarUrl("/images/avatar-menu.png");
                localStorage.removeItem("user_avatar_url");
            }
        });

        return () => unsubscribe();
    }, []);

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
                    <img src={avatarUrl} alt="Avatar" />
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
                                                    localStorage.removeItem("user_avatar_url");
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
