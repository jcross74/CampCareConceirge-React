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

  const [venuePhotos, setVenuePhotos] = useState([]);

  useEffect(() => {
    if (!camp.campVenue) return;
    // Ensure Google Maps script with Places library is loaded in index.html
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    const fullAddress = [
      camp.campVenue,
      camp.campStreet,
      camp.campCity,
      camp.campState
    ]
      .filter(Boolean)
      .join(', ');
    const request = {
      query: fullAddress,
      fields: ['photos']
    };
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]?.photos) {
        const urls = results[0].photos.slice(0,3).map(photo =>
          photo.getUrl({ maxWidth: 800, maxHeight: 600 })
        );
        setVenuePhotos(urls);
      }
    });
  }, [camp.campVenue, camp.campCity]);

  return (
    <>
      <MainNavigationDark />
      <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <img
            className={styles.mainImage}
            src={
              camp.campImage?.[0] ||
              "https://firebasestorage.googleapis.com/v0/b/campcare-react.firebasestorage.app/o/campImages%2FCamp_Image.png?alt=media&token=aec0e683-4681-4fba-95e5-145951685a60"
            }
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
            
              <div className={styles.venueDetails}>
                <h3 className={styles.mapTitle}>Venue Photos</h3>
                <div className={styles.venuePhotos}>
                  {venuePhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`${camp.campVenue} photo ${i+1}`}
                      className={styles.venuePhoto}
                    />
                  ))}
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
      </div>
      <Footer />
    </>
  );
};
export default CampDetails;