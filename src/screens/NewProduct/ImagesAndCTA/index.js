import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ImagesAndCTA.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";
import Cookies from "js-cookie";

const ImagesAndCTA = ({
  className,
  campVenue,
  setCampVenue,
  campStreet,
  setCampStreet,
  campCity,
  setCampCity,
  campState,
  setCampState,
  campZip,
  setCampZip,
  campImages,
  setCampImages,
}) => {
  // Local state for the city dropdown options
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const expiration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const now = new Date().getTime();

    // Check for cached city options in cookies
    const cachedOptions = Cookies.get("cityOptions");
    const cachedTimestamp = Cookies.get("cityOptionsTimestamp");

    if (
      cachedOptions &&
      cachedTimestamp &&
      now - parseInt(cachedTimestamp, 10) < expiration
    ) {
      if (isMounted) {
        setCityOptions(JSON.parse(cachedOptions));
      }
    } else {
      // Fetch cities from Firestore if no cached data or data is outdated
      const fetchCities = async () => {
        try {
          const db = getFirestore(app);
          const locationsColRef = collection(db, "locations");
          const snapshot = await getDocs(locationsColRef);
          // Map each document to its "city" field
          const cities = snapshot.docs.map((doc) => doc.data().city);
          // Sort cities alphabetically
          const sortedCities = cities.sort((a, b) => a.localeCompare(b));
          // Prepend the default unselected value "Select"
          const options = ["Select", ...sortedCities];
          // Cache the options and current timestamp for 7 days
          Cookies.set("cityOptions", JSON.stringify(options), { expires: 7 });
          Cookies.set("cityOptionsTimestamp", now.toString(), { expires: 7 });
          if (isMounted) {
            setCityOptions(options);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Location"
      classTitle="title-red"
    >
      <div className={styles.images}>
        

        <TextInput
          className={styles.field}
          label="Venue Name"
          name="campVenue"
          id="campVenue"
          type="text"
          tooltip="Maximum 100 characters."
          required
          value={campVenue}
          onChange={(e) => setCampVenue(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="Street Address"
          name="campStreet"
          id="campStreet"
          type="text"
          tooltip="Maximum 100 characters."
          required
          value={campStreet}
          onChange={(e) => setCampStreet(e.target.value)}
        />

        <Dropdown
          className={cn(styles.field, styles.dropdownMargin)}
          label="City"
          name="campCity"
          id="campCity"
          tooltip="Select a city"
          value={campCity}
          setValue={setCampCity}
          options={cityOptions}
          required
        />

        <div className={styles.fieldset}>
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="State"
            name="campState"
            id="campState"
            type="text"
            required
            value={campState}
            onChange={(e) => setCampState(e.target.value)}
          />
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Zip Code"
            name="campZip"
            id="campZip"
            type="text"
            required
            value={campZip}
            onChange={(e) => setCampZip(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default ImagesAndCTA;