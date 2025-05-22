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
                    <p className={styles.description}>We are dedicated to helping you quickly and confidently find the perfect camp or activity for your child. To achieve this, we focus exclusively on programs available in Fairfax County. This ensures that every option we present is local, relevant, and trustworthy. By narrowing our focus, we make it easier for you to discover high-quality camps that align with your child's interests and your family's needs, without the hassle of sifting through unsuitable options.
                    </p>
                    <Link to="/about" className={cn("button", styles.button)}>Learn More</Link>
                </div>

            </div>
        </div>
    )
};

export default Provide;