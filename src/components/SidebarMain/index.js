import React, { useState, useEffect } from "react";
import styles from "./SidebarMain.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Help from "./Help";
import Image from "../Image";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed
import Cookies from "js-cookie";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const SidebarMain = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pendingCount, setPendingCount] = useState("0");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPendingCount = async () => {
            const cached = Cookies.get("pendingCount");
            if (cached) {
                setPendingCount(cached);
                return;
            }
            const q = query(collection(db, "camps"), where("campStatus", "==", "Pending"));
            const snapshot = await getDocs(q);
            const count = snapshot.size.toString();
            setPendingCount(count);
            Cookies.set("pendingCount", count, { expires: 2 / 1440 }); // 2 minutes
        };

        fetchPendingCount();
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setIsAuthenticated(false);
            Cookies.remove("role");
            Cookies.remove("userUID");
            onClose(); // optionally close sidebar
        });
    };

    // Retrieve user role from cookies
    const userRole = Cookies.get("role");

    const navigation = [
        {
            title: "Home",
            icon: "faHome",
            viewBox: "0 0 576 512",
            url: "/",
        },
        {
            title: "About Us",
            slug: "about",
            icon: "faAbout",
            viewBox: "0 0 576 512",
            url: "/about",
        },
        {
            title: "Find a Camp",
            slug: "camps",
            icon: "faFind",
            viewBox: "0 0 576 512",
            url: "/find-camps",
        },
        {
            title: "Resources",
            slug: "resources",
            icon: "faResources",
            viewBox: "0 0 576 512",
            url: "/resources",
        },
        {
            title: "Contact Us",
            slug: "contact",
            icon: "faContact",
            viewBox: "0 0 576 512",
            url: "/contact",
        },
        ...(isAuthenticated && userRole === "1"
            ? [{
                title: "Admin Dashboard",
                slug: "admin-dashboard",
                icon: "faDashboard",
                viewBox: "0 0 576 512",
                url: "/admin/",
            }]
            : []),
        ...(isAuthenticated && userRole === "2"
            ? [{
                title: "Camp Dashboard",
                slug: "camp-dashboard",
                icon: "faDashboard",
                viewBox: "0 0 576 512",
                url: "/admin/",
            }]
            : []),
        ...(
            isAuthenticated ? [{
                title: "Sign Out",
                slug: "log-out",
                icon: "faProfile",
                viewBox: "0 0 576 512",
                action: handleSignOut,
            }] : [{
                title: "Sign In",
                slug: "sign-in",
                icon: "faProfile",
                viewBox: "0 0 576 512",
                url: "/sign-in",
            }]
        )
    ];

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" viewBox="0 0 16 16" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image
                        className={styles.pic}
                        src="/images/logo-dark.png"
                        srcDark="/images/logo-light.png"
                        alt="Camp Care Concierge"
                    />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink
                                className={cn(styles.item, {
                                    [styles.active]: pathname === x.url,
                                })}
                                to={x.url}
                                key={index}
                                onClick={onClose}
                            >
                                <Icon name={x.icon} size="24" viewBox={x.viewBox} />
                                {x.title}
                            </NavLink>
                        ) : (
                            <button
                                className={styles.item}
                                onClick={x.action}
                                key={index}
                            >
                                <Icon name={x.icon} size="24" viewBox={x.viewBox} />
                                {x.title}
                            </button>
                        )
                    )}
                </div>
                <button
                    className={styles.toggle}
                    onClick={() => setVisible(!visible)}
                >
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
                <div className={styles.foot}>
                    <Theme className={styles.theme} visibleSidebar={visible} />
                </div>
            </div>
            <Help
                visible={visibleHelp}
                setVisible={setVisibleHelp}
                onClose={onClose}
            />
            <div
                className={cn(styles.overlay, { [styles.active]: visible })}
                onClick={() => setVisible(false)}
            ></div>
        </>
    );
};

export default SidebarMain;