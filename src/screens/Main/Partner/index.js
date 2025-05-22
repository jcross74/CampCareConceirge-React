import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Partner.module.sass";
import Icon from "../../../components/Icon";

const Partner = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.partner_content}>
          <h2 className={styles.title}>Partner with us</h2>
          <p className={styles.description}>
            Reach more local families and fill your camps faster! We connect Fairfax County parents with trusted, high quality camps like yours -- right when they are searching.
          </p>
          
        </div>
        <div className={styles.partner_image}>
          <img
            src="/images/content/PartnerWithUs.png"
            alt="Exploring the outdoors"
          />
        </div>
        <div className={styles.adContainer}></div>
      </div>
    </div>
  );
};

export default Partner;