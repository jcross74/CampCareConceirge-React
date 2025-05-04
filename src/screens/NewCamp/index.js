import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewCamp.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import Price from "./Price";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import Discussion from "./Discussion";
import Preview from "./Preview";
import Panel from "./Panel";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase";

const NewCamp = () => {
  // Visibility states
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  // Schedule states (for the schedule modal, if used)
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  // Camps document fields state
  const [campName, setCampName] = useState("");
  const [campProvider, setCampProvider] = useState("Select");
  const [campSeason, setCampSeason] = useState("Select");
  const [campStart, setCampStart] = useState("");
  const [campEnd, setCampEnd] = useState("");
  const [campDescription, setCampDescription] = useState("");
  const [campTags, setCampTags] = useState([]); // Array of strings
  const [campGenders, setCampGenders] = useState("Select"); // String value
  const [campAgeMax, setCampAgeMax] = useState(0); // Number value
  const [campAgeMin, setCampAgeMin] = useState(0); // Number value
  const [campVenue, setCampVenue] = useState("");
  const [campStreet, setCampStreet] = useState("");
  const [campCity, setCampCity] = useState("");
  const [campState, setCampState] = useState("VA"); // Default "VA"
  const [campZip, setCampZip] = useState("");
  const [campRegistrationURL, setCampRegistrationURL] = useState("");
  const [campStatus, setCampStatus] = useState("Pending");
  const [campCost, setCampCost] = useState(0); // Number value
  const [campFormat, setCampFormat] = useState("Select");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations:
    if (!campName) {
      alert("Please enter a camp name.");
      return;
    }
    if (!campStart || !campEnd) {
      alert("Please enter both a start and end date.");
      return;
    }
    const startDateObj = new Date(campStart);
    const endDateObj = new Date(campEnd);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      alert("Please enter valid start and end dates.");
      return;
    }

    try {
      const db = getFirestore(app);
      const storage = getStorage(app);
      // Reference the "camps" collection
      const campsRef = collection(db, "camps");


      // Convert start and end dates to Firestore Timestamps
      const startTimestamp = Timestamp.fromDate(startDateObj);
      const endTimestamp = Timestamp.fromDate(endDateObj);
      const modifiedTimestamp = Timestamp.now();

      // Write all the fields to Firestore with the expected field names.
      await addDoc(campsRef, {
        campName,                             // String
        campProvider,                         // String
        campSeason,                           // String
        campStart: startTimestamp,            // Timestamp
        campEnd: endTimestamp,                // Timestamp
        campDescription,                      // String
        campTags,                             // Array of strings
        campGenders,                          // String
        campAgeMax: Number(campAgeMax),         // Number
        campAgeMin: Number(campAgeMin),         // Number
        campVenue,                            // String
        campStreet,                           // String
        campCity,                             // String
        campState,                            // String
        campZip,                              // String
        campRegistrationURL,                  // String
        campStatus,                           // String
        campCost: Number(campCost),            // Number
        campFormat,                           // String
        campModified: modifiedTimestamp       // Timestamp
      });

      alert("Camp added successfully!");

      // Reset form fields to their initial values.
      setCampName("");
      setCampProvider("Select");
      setCampSeason("Select");
      setCampStart("");
      setCampEnd("");
      setCampDescription("");
      setCampTags([]);
      setCampGenders("Select");
      setCampAgeMax(0);
      setCampAgeMin(0);
      setCampVenue("");
      setCampStreet("");
      setCampCity("");
      setCampState("VA");
      setCampZip("");
      setCampRegistrationURL("");
      setCampStatus("Pending");
      setCampCost(0);
      setCampFormat("Select");

      // Stay on the same page (do not redirect)
      // Optionally, you could focus back to the form or display a success message.
    } catch (error) {
      console.error("Error adding camp:", error);
      alert("Error adding camp. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.col}>
          {/* Child components with controlled inputs */}
          <NameAndDescription
            className={styles.card}
            campName={campName}
            setCampName={setCampName}
            campProvider={campProvider}
            setCampProvider={setCampProvider}
            campSeason={campSeason}
            setCampSeason={setCampSeason}
            campStart={campStart}
            setCampStart={setCampStart}
            campEnd={campEnd}
            setCampEnd={setCampEnd}
            campDescription={campDescription}
            setCampDescription={setCampDescription}
          />
          <Discussion
            className={styles.card}
            campGenders={campGenders}
            setCampGenders={setCampGenders}
            campAgeMin={campAgeMin}
            setCampAgeMin={setCampAgeMin}
            campAgeMax={campAgeMax}
            setCampAgeMax={setCampAgeMax}
          />
          <Price
            className={styles.card}
            campRegistrationURL={campRegistrationURL}
            setCampRegistrationURL={setCampRegistrationURL}
            campCost={campCost}
            setCampCost={setCampCost}
          />
          <ImagesAndCTA
            className={styles.card}
            campVenue={campVenue}
            setCampVenue={setCampVenue}
            campStreet={campStreet}
            setCampStreet={setCampStreet}
            campCity={campCity}
            setCampCity={setCampCity}
            campState={campState}
            setCampState={setCampState}
            campZip={campZip}
            setCampZip={setCampZip}
          />
          <CategoryAndAttibutes
            className={styles.card}
            campTags={campTags}
            setCampTags={setCampTags}
            campFormat={campFormat}
            setCampFormat={setCampFormat}
          />
          {/* Optionally include ProductFiles if needed */}
        </div>
        
      </div>
      <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
      />
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>
      <button type="submit" className={styles.submitButton}>
        Submit New Camp
      </button>
    </form>
  );
};

export default NewCamp;