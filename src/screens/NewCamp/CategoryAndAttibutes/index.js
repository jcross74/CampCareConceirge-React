import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Checkbox";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";
import Cookies from "js-cookie";

const CategoryAndAttibutes = ({
  className,
  campFormat,
  setCampFormat,
  campTags,
  setCampTags,
}) => {
  // Local state for fetched format options from Firestore "format" collection
  const [formatOptions, setFormatOptions] = useState([]);
  // Local state for tags fetched from Firestore "tags" collection
  const [tagsFromDB, setTagsFromDB] = useState([]);

  // Fetch tags from Firestore "tags" collection
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const db = getFirestore(app);
        const tagsColRef = collection(db, "tags");
        const snapshot = await getDocs(tagsColRef);
        // Map each document to an object (assume field "tagName" exists)
        const tagsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort tags alphabetically using the tagName field
        const sortedTags = tagsData.sort((a, b) =>
          a.tagName.localeCompare(b.tagName)
        );
        setTagsFromDB(sortedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Fetch and cache format options from Firestore "format" collection using js-cookie
  useEffect(() => {
    let isMounted = true;
    const expiration = 24 * 60 * 60 * 1000; // 24 hours in ms
    const now = new Date().getTime();

    const cachedFormats = Cookies.get("formatOptions");
    const cachedTimestamp = Cookies.get("formatOptionsTimestamp");

    if (
      cachedFormats &&
      cachedTimestamp &&
      now - parseInt(cachedTimestamp, 10) < expiration
    ) {
      if (isMounted) {
        setFormatOptions(JSON.parse(cachedFormats));
      }
    } else {
      const fetchFormatOptions = async () => {
        try {
          const db = getFirestore(app);
          const formatColRef = collection(db, "format");
          const snapshot = await getDocs(formatColRef);
          let data = snapshot.docs.map((doc) => doc.data().formatName);
          data = data.sort((a, b) => a.localeCompare(b));
          const newFormatOptions = ["Select", ...data];
          Cookies.set("formatOptions", JSON.stringify(newFormatOptions), { expires: 1 });
          Cookies.set("formatOptionsTimestamp", now.toString(), { expires: 1 });
          if (isMounted) {
            setFormatOptions(newFormatOptions);
          }
        } catch (error) {
          console.error("Error fetching format options:", error);
        }
      };

      fetchFormatOptions();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Handler for updating campTags using tagName instead of document ID.
  const handleTagChange = (tagName) => {
    if (campTags.includes(tagName)) {
      // Remove the tagName from parent's state.
      setCampTags(campTags.filter((x) => x !== tagName));
    } else {
      // Add the tagName to parent's state.
      setCampTags([...campTags, tagName]);
    }
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Camp attributes"
      classTitle="title-red"
    >
      <div className={styles.images}>
        {/* Controlled Dropdown for campFormat using parent's state */}
        <Dropdown
          className={cn(styles.field, styles.dropdownMargin)}
          label="Format"
          name="campFormat"
          tooltip="Select a format"
          value={campFormat}
          setValue={setCampFormat}
          options={formatOptions}
          required
        />

        <div className={styles.list}>
          {tagsFromDB.map((tag) => (
            <Checkbox
              className={styles.checkbox}
              name="campTags"
              id={tag.tagName}
              content={tag.tagName} // Display tagName as label
              // Check if parent's campTags array includes the tagName value
              value={campTags.includes(tag.tagName)}
              onChange={() => handleTagChange(tag.tagName)}
              key={tag.id}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;