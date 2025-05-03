import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Provide.module.sass";
import Icon from "../../../components/Icon";

const Provide = () => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
            <div className={styles.provide_image}>
                <img className={styles.fullWidth}
                    src="/images/content/WhatWeProvide.png"
                    alt="Kids doing science activity"
                />
            </div>

            <div className={styles.provide_content}>
                <h2 className={styles.title}>What we provide?</h2>
                <p className={styles.description}>We’re committed to helping you find the perfect camp or activity for your child—quickly and with confidence. That’s why we focus exclusively on programs in Fairfax County, ensuring that every option we feature is local, relevant, and trusted. By narrowing our focus, we make it easier for you to discover high-quality camps that match your child’s interests and your family’s needs—without the hassle of sorting through options that aren’t a good fit.
                </p>
                <Link to="/about" className={cn("button", styles.button)}>Learn More</Link>
            </div>
        
            </div>
        </div>
    )
};

export default Provide;