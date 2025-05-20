import React, { useState } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../../Icon";

const Dropdown = ({ className, item: { icon, title, dropdown, add, slug, viewBox }, visibleSidebar, setValue, onClose }) => {
    const [visible, setVisible] = useState(false);

    const { pathname } = useLocation();

    const handleClick = () => {
        setVisible(!visible);
        setValue(true);
    };

    const Head = () => {
        return (
            <button
                className={cn(
                    styles.head,
                    {
                        [styles.active]: pathname.includes(slug),
                    },
                    { [styles.wide]: visibleSidebar }
                )}
                onClick={() => handleClick()}
            >
                <Icon name={icon} size="24" viewBox={viewBox} />
                {title}
                <Icon name="arrow-down" size="24" viewBox="0 0 512 512" />
            </button>
        );
    };

    return (
        <div
            className={cn(
                styles.dropdown,
                className,
                { [styles.active]: visible },
                {
                    [styles.active]: pathname.includes(slug),
                },
                { [styles.wide]: visibleSidebar }
            )}
        >
            {add ? (
                <div
                    className={cn(styles.top, {
                        [styles.active]: pathname.startsWith("/admin/camps/add"),
                    })}
                >
                    <Head />
                    <Link
                        className={cn(styles.add, {
                            [styles.active]:
                                pathname.startsWith("/admin/camps/add"),
                        })}
                        to="/admin/camps/add"
                        onClick={onClose}
                    >
                       <Icon name="faPlus" size="24" viewBox="0 0 512 512" />
                    </Link>
                </div>
            ) : (
                <Head />
            )}
            <div className={styles.body}>
                {dropdown.map((x, index) => (
                    <NavLink
                        className={cn(styles.link, {
                            [styles.active]: pathname === x.url,
                        })}
                        to={x.url}
                        key={index}
                        onClick={onClose}
                    >
                        {x.title}
                        {x.counter ? (
                            <div
                                className={styles.counter}
                                style={{ backgroundColor: x.colorCounter }}
                            >
                                {x.counter}
                            </div>
                        ) : (
                            <Icon name="arrow-next" size="24" viewBox="0 0 512 512" />
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
