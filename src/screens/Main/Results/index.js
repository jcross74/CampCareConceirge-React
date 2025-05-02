import React, { useEffect, useState } from 'react';
import cn from 'classnames'
import MainNavigationDark from "../../../components/MainNavigationDark";
import Footer from "../../../components/Footer";
import styles from "./Results.module.sass";
import Card from "../../../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';


const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const results = state?.results || [];
    return (
        <>
        <MainNavigationDark />
        <div className={styles.section}>
            <div className={styles.container}>
        <div className={styles.resultsPage}>
          <div className={styles.sidebar}>
            <Card className={styles.card}>
              <div className={styles.filterTitle}>Find Camps & Activities</div>
              <form className={styles.filters}>
                <TextInput type="text" placeholder="Keywords" />
                <TextInput type="text" placeholder="Locations" />
                <Dropdown
                  className={cn(styles.field, styles.dropdownMargin)}
                  placeholder="Camp & Activity Type"
                  value=""
                  setValue={() => {}}
                  options={["Day Camp", "Art Camp", "STEM Camp", "Sports Camp"]}
                />
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Age Range"
                  value=""
                  setValue={() => {}}
                  options={["3-5", "6-8", "9-11", "12+"]}
                />
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Cost"
                  value=""
                  setValue={() => {}}
                  options={["Free", "$1-$100", "$101-$250", "$251+"]}
                />
                <button type="submit" className={styles.submitButton}>Submit</button>
              </form>
            </Card>
          </div>
          <div className={styles.campGrid}>
            {results.map((item, i) => {
              const imageSrc = item.campImage && item.campImage.length > 0
                ? item.campImage[0]
                : "/images/content/Camp_Image.png";
              const priceDisplay = parseFloat(item.campCost) === 0 || item.campCost === "0"
                ? "Free"
                : `$${item.campCost}`;
              return (
                <div
                  key={i}
                  className={styles.campCard}
                  onClick={() => {
                    const fullCampData = { ...item };
                    console.log("Passing to Details:", fullCampData);
                    navigate("/details", { state: fullCampData });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const fullCampData = { ...item };
                      console.log("Passing to Details (keyboard):", fullCampData);
                      navigate("/details", { state: fullCampData });
                    }
                  }}
                >
                  <div className={styles.imageWrapper}>
                    <img src={imageSrc} alt={item.campName} />
                    <span className={styles.price}>
                      {priceDisplay}
                    </span>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.topRow}>
                      <div className={styles.heading}>{item.campName}</div>
                    </div>
                    {(() => {
                      const fullDesc = item.campDescription || "";
                      if (fullDesc.length > 200) {
                        const trimmed = fullDesc.slice(0, 200);
                        return (
                          <p className={styles.description}>
                            {trimmed}
                            <strong> ...Learn more</strong>
                          </p>
                        );
                      }
                      return <p className={styles.description}>{fullDesc}</p>;
                    })()}
                    <div className={styles.meta}>
                      <span>{item.campCity}, VA {item.zip}</span>
                      <span>{item.ageRange}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
       </div>
        </div>
        </div>
        <Footer />
      </>     
    );
};
export default Results;