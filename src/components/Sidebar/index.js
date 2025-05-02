import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed
import Cookies from "js-cookie";

const Sidebar = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pendingCount, setPendingCount] = useState("0");

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

    const navigation = [
        {
            title: "Home",
            icon: "home",
            url: "/admin/",
        },
        {
            title: "Camps",
            slug: "camps",
            icon: "schedule",
            add: true,
            dropdown: [
                {
                    title: "Overview",
                    url: "/admin/camps/dashboard",
                },
                {
                    title: "Pending",
                    url: "/admin/camps/pending",
                    counter: pendingCount,
                    colorCounter: "#FFBC99",
                },
                /* {
                    title: "Approved",
                    url: "/admin/camps/approved",
                }, */
            ],
        },
        {
            title: "Users",
            slug: "users",
            icon: "profile-circle",
            dropdown: [
                {
                    title: "Overview",
                    url: "/admin/users/dashboard",
                },
            ],
        },
        {
            title: "Providers",
            slug: "providers",
            icon: "store",
            dropdown: [
                {
                    title: "Overview",
                    url: "/admin/providers/overview",
                },
                {
                    title: "Pending",
                    url: "/admin/providers/pending",
                },
            
            ],
        },
        {
            title: "Data",
            slug: "income",
            icon: "lightning",
            dropdown: [
                {
                    title: "Activity",
                    url: "/admin/data/activity",
                },
                {
                    title: "Format",
                    url: "/admin/data/format",
                },
                {
                    title: "Reviews",
                    url: "/admin/data/reviews",
                },
                {
                    title: "Seasons",
                    url: "/admin/data/seasons",
                },
                {
                    title: "Tags",
                    url: "/admin/data/tags",
                },
            ],
        },
    ];

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image
                        className={styles.pic}
                        src="/images/logo-dark.png"
                        srcDark="/images/logo-light.png"
                        alt="Core"
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
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
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

export default Sidebar;