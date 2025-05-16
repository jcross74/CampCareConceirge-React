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
    const initialResults = state?.results || [];

    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [campType, setCampType] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [cost, setCost] = useState('');
    const [filteredResults, setFilteredResults] = useState(initialResults);

    const handleFilter = (e) => {
        e.preventDefault();

        const filtered = initialResults.filter(item => {
            // Keyword filter: check if keyword is in any stringified field
            if (keyword.trim()) {
                const keywordLower = keyword.toLowerCase();
                const itemString = JSON.stringify(item).toLowerCase();
                if (!itemString.includes(keywordLower)) {
                    return false;
                }
            }

            // Location filter: match campCity
            if (location && location !== 'Locations') {
                if (!item.campCity || item.campCity.toLowerCase() !== location.toLowerCase()) {
                    return false;
                }
            }

            // Camp Type filter: check if in campTags
            if (campType && campType !== 'Camp Type') {
                const tags = item.campTags || [];
                if (!tags.map(t => t.toLowerCase()).includes(campType.toLowerCase())) {
                    return false;
                }
            }

            // Age Range filter: check if both min and max ages are within selected range
            if (ageRange && ageRange !== 'Age Range') {
                const ageRangeParts = ageRange.split('-');
                let filterMin = 0;
                let filterMax = Infinity;
                if (ageRangeParts.length === 2) {
                    filterMin = parseInt(ageRangeParts[0], 10);
                    filterMax = parseInt(ageRangeParts[1], 10);
                } else if (ageRange.endsWith('+')) {
                    filterMin = parseInt(ageRange.replace('+',''), 10);
                    filterMax = Infinity;
                }
                const campMinAge = item.minAge !== undefined ? Number(item.minAge) : 0;
                const campMaxAge = item.maxAge !== undefined ? Number(item.maxAge) : Infinity;
                if (campMinAge > filterMax || campMaxAge < filterMin) {
                    return false;
                }
            }

            // Cost filter: check if campCost falls in range
            if (cost && cost !== 'Cost') {
                const campCostNum = parseFloat(item.campCost);
                if (cost === 'Free') {
                    if (campCostNum !== 0) {
                        return false;
                    }
                } else if (cost === '$1-$100') {
                    if (campCostNum < 1 || campCostNum > 100) {
                        return false;
                    }
                } else if (cost === '$101-$250') {
                    if (campCostNum < 101 || campCostNum > 250) {
                        return false;
                    }
                } else if (cost === '$251+') {
                    if (campCostNum < 251) {
                        return false;
                    }
                }
            }

            return true;
        });

        setFilteredResults(filtered);
    };

    return (
        <>
        <MainNavigationDark />
        <div className={styles.section}>
            <div className={styles.container}>
        <div className={styles.resultsPage}>
          <div className={styles.sidebar}>
            <Card className={styles.card}>
              <div className={styles.filterTitle}>Find Camps & Activities</div>
              <form className={styles.filters} onSubmit={handleFilter}>
                <TextInput type="text" placeholder="Keywords" value={keyword} onChange={e => setKeyword(e.target.value)} />
                
                <Dropdown
                  className={cn(styles.field, styles.dropdownMargin)}
                  placeholder="Locations"
                  value={location || 'Locations'}
                  setValue={setLocation}
                  options={[
                    "Alexandria",
                    "Annandale",
                    "Burke",
                    "Centreville",
                    "Chantilly",
                    "Clifton",
                    "Dunn Loring",
                    "Fairfax",
                    "Fairfax Station",
                    "Falls Church",
                    "Fort Belvoir",
                    "Great Falls",
                    "Herndon",
                    "Lorton",
                    "McLean",
                    "Oakton",
                    "Reston",
                    "Springfield",
                    "Vienna", 
                    "Virtual",
                    "West McLean"
                  ]}
                />
                <Dropdown
                  className={cn(styles.field, styles.dropdownMargin)}
                  placeholder="Camp & Activity Type"
                  value={campType || 'Camp Type'}
                  setValue={setCampType}
                  options={["Day Camp", "Art Camp", "STEM Camp", "Sports Camp"]}
                />
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Age Range"
                  value={ageRange || 'Age Range'}
                  setValue={setAgeRange}
                  options={["3-5", "6-8", "9-11", "12+"]}
                />
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Cost"
                  value={cost || 'Cost'}
                  setValue={setCost}
                  options={["Free", "$1-$100", "$101-$250", "$251+"]}
                />
                <button type="submit" className={styles.submitButton}>Filter</button>
              </form>
            </Card>
          </div>
          <div className={styles.campGrid}>
            {filteredResults.length === 0 && (
              <div className={styles.noResults}>No results found</div>
            )}
            {filteredResults.map((item, i) => {
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
                            <strong> ... Learn more</strong>
                          </p>
                        );
                      }
                      return <p className={styles.description}>{fullDesc}</p>;
                    })()}
                    <div className={styles.meta}>
                      <span>{item.campCity}, VA {item.zip}</span>
                      <span>
                        {new Date(item.campStart.seconds * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })} – {new Date(item.campEnd.seconds * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
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