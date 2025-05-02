import React, { useEffect, useState } from 'react';
import cn from 'classnames'
import MainNavigationDark from "../../../components/MainNavigationDark";
import Footer from "../../../components/Footer";
import styles from "./Details.module.sass";
import Card from "../../../components/Card";
import { useLocation } from "react-router-dom";
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';


const CampDetails = () => {
  const { state } = useLocation();
  const camp = state || {};

  return (
    <>
      <MainNavigationDark />
      <div className={styles.section}>
        <div className={styles.header}>
          <img
            className={styles.mainImage}
            src={camp.campImage?.[0]}
            alt={camp.campName}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <h1 className={styles.title}>{camp.campName}</h1>
            <p className={styles.description}>{camp.campDescription}</p>
            <div className={styles.details}>
              <h3 className={styles.detailsTitle}>Additional Details</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.label}>Location:</div>
                <div className={styles.value}>{camp.campVenue}</div>
                <div className={styles.label}>City:</div>
                <div className={styles.value}>{camp.campCity}</div>
                <div className={styles.label}>Dates:</div>
                <div className={styles.value}>
                  {camp.campStart?.seconds
                    ? new Date(camp.campStart.seconds * 1000).toLocaleDateString()
                    : ""} –{" "}
                  {camp.campEnd?.seconds
                    ? new Date(camp.campEnd.seconds * 1000).toLocaleDateString()
                    : ""}
                </div>
                
                <div className={styles.label}>Gender(s):</div>
                <div className={styles.value}>{camp.campGenders}</div>
                
                <div className={styles.label}>Age Range:</div>
                <div className={styles.value}>{camp.campAgeMin} – {camp.campAgeMax}</div>
                
                <div className={styles.label}>Cost:</div>
                <div className={styles.value}>{parseFloat(camp.campCost) === 0 ? "Free" : `$${camp.campCost}`}</div>
                
                <div className={styles.value}>{camp.campPaymentType}</div>
              </div>
            </div>
            <div className={styles.mapSection}>
              <h3 className={styles.mapTitle}>Map View</h3>
              <iframe
                className={styles.mapFrame}
                title="Camp Location Map"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${camp.campStreet}, ${camp.campState} ${camp.campZip}`)}&output=embed`}
              />
            </div>
          </div>
          <aside className={styles.sidebar}>
            <Card className={styles.registrationCard}>
              <div className={styles.registrationTitle}>Registration</div>
              <div className={styles.venueTitle}>{camp.campVenue}</div>
              <button
                className={styles.registerButton}
                onClick={() => window.open(camp.campRegistrationURL, "_blank", "noopener,noreferrer")}
              >
                Register Now
              </button>
            </Card>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CampDetails;