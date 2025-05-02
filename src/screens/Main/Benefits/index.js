import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Benefits.module.sass";
import Icon from "../../../components/Icon";

const Benefits = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.benefits_content}>
          <h2 className={styles.title}>Benefits of choosing Camp Care Concierge</h2>
          <p className={styles.description}>
            Our search tool is designed by parents, for parents—because we understand what matters most when choosing the right camp or activity. We’re committed to providing you with the information you need, exactly when you need it, so you can make the best decisions for your child with ease and confidence.
          </p>
          <ul className={styles.list}>
            <li><Icon name="check" /> Built by parents</li>
            <li><Icon name="check" /> Extensive network</li>
            <li><Icon name="check" /> Local &amp; trusted</li>
          </ul>
          <Link to="/about" className={cn("button", styles.button)}>Learn More</Link>
        </div>
        <div className={styles.benefits_image}>
          <img
            src="/images/content/BenefitsImage.png"
            alt="Kids doing science activity"
          />
        </div>
      </div>
    </div>
  );
};

export default Benefits;