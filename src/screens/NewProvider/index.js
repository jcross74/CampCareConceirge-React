import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewProvider.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import ProviderInformation from "./ProviderInformation";
import Panel from "./Panel";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

const NewProvider = () => {
  // Visibility states
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  // Provider document fields state
  const [providerName, setProviderName] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerCity, setProviderCity] = useState("");
  const [providerState, setProviderState] = useState("VA");
  const [providerZip, setProviderZip] = useState("");
  const [providerURL, setProviderURL] = useState("");
  const [providerStatus, setProviderStatus] = useState("Pending");
  const [providerImages, setProviderImages] = useState([]); // Array of image URLs
  const [selectedFiles, setSelectedFiles] = useState([]); // Raw File objects awaiting upload

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!providerName) {
      alert("Please enter a provider name.");
      return;
    }

    try {
      const db = getFirestore(app);
      const campsRef = collection(db, "providers");

      // Upload selected files and collect URLs
      const urls = [];
      for (const file of selectedFiles) {
        const storageRef = ref(getStorage(app), `providerImages/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        urls.push(downloadUrl);
      }

      await addDoc(campsRef, {
        providerName,
        providerCity,
        providerEmail,
        providerPhone,
        providerState,
        providerZip,
        providerURL,
        providerStatus,
        providerImages: urls,
      });

      alert("Provider added successfully!");

      // Reset form fields to their initial values.
      setProviderName("");
      setProviderPhone("");
      setProviderEmail("");
      setProviderCity("");
      setProviderState("VA");
      setProviderZip("");
      setProviderURL("");
      setProviderStatus("Pending");
      setProviderImages([]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error adding provider:", error);
      alert("Error adding provider. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.col}>
          <ProviderInformation
            className={styles.card}
            providerName={providerName}
            setProviderName={setProviderName}
            providerCity={providerCity}
            setProviderCity={setProviderCity}
            providerEmail={providerEmail}
            setProviderEmail={setProviderEmail}
            providerPhone={providerPhone}
            setProviderPhone={setProviderPhone}
            providerState={providerState}
            setProviderState={setProviderState}
            providerStatus={providerStatus}
            setProviderStatus={setProviderStatus}
            providerURL={providerURL}
            setProviderURL={setProviderURL}
            providerZip={providerZip}
            setProviderZip={setProviderZip}
            providerImages={providerImages}
            setProviderImages={setProviderImages}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        </div>
      </div>
      <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
      />
      <TooltipGlodal />
      <button type="submit" className={styles.submitButton}></button>
    </form>
  );
};

export default NewProvider;