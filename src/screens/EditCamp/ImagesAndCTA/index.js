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
import { getStorage, ref, deleteObject } from "firebase/storage"; // NEW

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
  campImages = [],
  setCampImages, // NEW
  selectedFiles,
  setSelectedFiles,
}) => {
  // Local state for the city dropdown options
  const [cityOptions, setCityOptions] = useState([]);
  const [fileError, setFileError] = useState("");
  const [deleteError, setDeleteError] = useState(""); // NEW

  useEffect(() => {
    let isMounted = true;
    const expiration = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    const now = new Date().getTime();

    // City options from cache or Firestore
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
      const fetchCities = async () => {
        try {
          const db = getFirestore(app);
          const locationsColRef = collection(db, "locations");
          const snapshot = await getDocs(locationsColRef);
          const cities = snapshot.docs.map((doc) => doc.data().city);
          const sortedCities = cities.sort((a, b) => a.localeCompare(b));
          const options = ["Select", ...sortedCities];
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

  // NEW: Function to delete image from Firebase Storage and remove from campImages array
  const handleDeleteUploadedImage = async (imgUrl, idx) => {
    setDeleteError("");
    try {
      const storage = getStorage(app);
      // Find the path after the bucket domain (starts after "/o/")
      // Firebase URLs: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media...
      // We need to decodeURIComponent on the path between "/o/" and "?alt="
      const match = imgUrl.match(/\/o\/(.*?)\?/);
      if (!match || !match[1]) throw new Error("Unable to parse image path.");
      const fullPath = decodeURIComponent(match[1]);
      const fileRef = ref(storage, fullPath);
      await deleteObject(fileRef);
      // Remove from campImages in parent state
      setCampImages(prev =>
        prev.filter((_, imageIdx) => imageIdx !== idx)
      );
    } catch (err) {
      setDeleteError("Error deleting image.");
      console.error(err);
    }
  };

  // Show both URLs from campImages and File previews from selectedFiles
  const renderThumbnails = () => (
    <div className={styles.previewThumbnails}>
      {campImages && campImages.length > 0 &&
        campImages.map((imgUrl, idx) => (
          <div key={`camp-img-${idx}`} className={styles.thumbnailItem}>
            <img
              src={imgUrl}
              alt={`uploaded-thumb-${idx}`}
              className={styles.previewThumbnail}
            />
            {/* "X" button to delete uploaded image */}
            <button
              type="button"
              className={styles.removeButton}
              title="Remove Image"
              style={{position: 'absolute', top: 4, right: 4, zIndex: 2}}
              onClick={() => handleDeleteUploadedImage(imgUrl, idx)}
            >
              &times;
            </button>
          </div>
        ))}
      {selectedFiles && selectedFiles.length > 0 &&
        selectedFiles.map((file, idx) => (
          <div key={`new-img-${idx}`} className={styles.thumbnailItem}>
            <img
              src={URL.createObjectURL(file)}
              alt={`thumb-${idx}`}
              className={styles.previewThumbnail}
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                setSelectedFiles(prev => [
                  ...prev.slice(0, idx),
                  ...prev.slice(idx + 1)
                ])
              }
            >
              &times;
            </button>
          </div>
        ))}
    </div>
  );

  const handleFileUpload = (input) => {
    setFileError("");
    let file;
    if (input?.target?.files?.length) {
      file = input.target.files[0];
    } else if (Array.isArray(input) && input.length) {
      file = input[0];
    } else {
      file = input;
    }
    if (!file || typeof file.name !== "string") {
      setFileError("No valid file selected.");
      return;
    }
    const ext = file.name.split('.').pop().toLowerCase();
    const validTypes = ["image/png", "image/gif", "image/jpeg", "image/webp"];
    const validExts = ["png", "gif", "jpg", "jpeg", "webp"];
    if (!(validTypes.includes(file.type) || validExts.includes(ext))) {
      setFileError("Only PNG, GIF, JPG, and WEBP files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size must be under 2 MB.");
      return;
    }
    setSelectedFiles(prev => [...prev, file]);
  };

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
        <File
          className={styles.field}
          label="Upload Image"
          name="campImage"
          id="campImage"
          accept=".png,.gif,.jpg,.jpeg,.webp"
          onChange={handleFileUpload}
        />
        {fileError && <div className={styles.error}>{fileError}</div>}
        {deleteError && <div className={styles.error}>{deleteError}</div>}
        {(campImages?.length > 0 || selectedFiles?.length > 0) && renderThumbnails()}
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