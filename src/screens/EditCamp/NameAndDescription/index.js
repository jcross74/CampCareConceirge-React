import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";
import Cookies from "js-cookie";

const seasonsOptions = ["Select", "Summer 2025", "Winter 2025", "Spring 2025", "Fall 2025"];

const NameAndDescription = ({
  className,
  campName,
  setCampName,
  campProvider,
  setCampProvider,
  campSeason,
  setCampSeason,
  campStart,
  setCampStart,
  campEnd,
  setCampEnd,
  campDescription,
  setCampDescription,
  campStatus,
  setCampStatus,
}) => {
  // New state: provider options fetched from Firestore (cached using js-cookie)
  const [providerOptions, setProviderOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const expiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = new Date().getTime();

    // Check for cached provider options in cookies
    const cachedOptions = Cookies.get("providerOptions");
    const cachedTimestamp = Cookies.get("providerOptionsTimestamp");

    if (
      cachedOptions &&
      cachedTimestamp &&
      now - parseInt(cachedTimestamp, 10) < expiration
    ) {
      if (isMounted) {
        setProviderOptions(JSON.parse(cachedOptions));
      }
    } else {
      // Otherwise, fetch from Firestore
      const fetchProviders = async () => {
        try {
          const db = getFirestore(app);
          const providersColRef = collection(db, "providers");
          const snapshot = await getDocs(providersColRef);
          // Map the documents to their "providerName" field
          const data = snapshot.docs.map((doc) => doc.data().providerName);
          const options = ["Select", ...data];
          // Cache the data in cookies for 1 day
          Cookies.set("providerOptions", JSON.stringify(options), { expires: 1 });
          Cookies.set("providerOptionsTimestamp", now.toString(), { expires: 1 });
          if (isMounted) {
            setProviderOptions(options);
          }
        } catch (error) {
          console.error("Error fetching providers:", error);
        }
      };
      fetchProviders();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Name & description"
      classTitle="title-red"
      head={
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/admin/camps/dashboard"
        >
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        {/* Controlled input for Camp or Activity name */}
        <TextInput
          className={styles.field}
          label="Camp or Activity name"
          name="campName"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={campName}
          onChange={(e) => setCampName(e.target.value)}
        />

        {/* Controlled input for Camp Status */}
        <Dropdown
          className={cn(styles.field, styles.dropdownMargin)}
          label="Camp Status"
          name="campStatus"
          tooltip="Set the current approval status"
          value={campStatus}
          setValue={setCampStatus}
          options={["Approved", "Pending"]}
          required
        />

        {/* Controlled dropdown for Provider Name */}
        <Dropdown
          className={cn(styles.field, styles.dropdownMargin)}
          label="Provider Name"
          name="campProvider"
          tooltip="Only approved providers can be selected"
          value={campProvider}
          setValue={setCampProvider}
          options={providerOptions}
          required
        />

        {/* Controlled dropdown for Season */}
        <Dropdown
          className={cn(styles.field, styles.dropdownMargin)}
          label="Season"
          name="campSeason"
          tooltip="Select a season"
          value={campSeason}
          setValue={setCampSeason}
          options={seasonsOptions}
          required
        />

        <div className={styles.fieldset}>
          {/* Controlled input for Camp Start Date */}
          <TextInput
            className={styles.field}
            label="Camp Start Date"
            name="campStart"
            type="date"
            required
            value={campStart}
            onChange={(e) => setCampStart(e.target.value)}
          />
          {/* Controlled input for Camp End Date */}
          <TextInput
            className={styles.field}
            label="Camp End Date"
            name="campEnd"
            type="date"
            required
            value={campEnd}
            onChange={(e) => setCampEnd(e.target.value)}
          />
        </div>

        {/* Replacing Editor with a multiline text input */}
        <TextInput
          className={styles.field}
          label="Description"
          name="campDescription"
          type="textarea"
          tooltip="Description"
          required
          value={campDescription}
          onChange={(e) => setCampDescription(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default NameAndDescription;