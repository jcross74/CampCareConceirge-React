import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const DEFAULT_AVATAR = "/images/content/Avatar-User.png";
const AVATAR_CACHE_KEY = "user_avatar_url";

const ProfileInformation = ({
  className,
  nameFirst,
  nameLast,
  email,
  setNameFirst,
  setNameLast,
}) => {
  const [userImage, setUserImage] = useState(() => {
    // Initialize from localStorage if available
    return localStorage.getItem(AVATAR_CACHE_KEY) || DEFAULT_AVATAR;
  });
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const newAvatar = data.avatar ? `${data.avatar}?t=${Date.now()}` : DEFAULT_AVATAR;
          setUserImage(newAvatar);
          localStorage.setItem(AVATAR_CACHE_KEY, newAvatar);
        } else {
          setUserImage(DEFAULT_AVATAR);
          localStorage.removeItem(AVATAR_CACHE_KEY);
        }
      },
      (error) => {
        console.error("Failed to listen for user avatar changes:", error);
        setUserImage(DEFAULT_AVATAR);
        localStorage.removeItem(AVATAR_CACHE_KEY);
      }
    );

    return () => unsubscribe();
  }, []);

  const onFileChange = async (e) => {
    setFileError("");
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setFileError("Invalid file type. Only PNG and JPG are allowed.");
      return;
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setFileError("File size exceeds 2 MB.");
      return;
    }

    setUploading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const storage = getStorage();
      const ext = file.name.split(".").pop().toLowerCase();
      const fileName = `${user.uid}.${ext}`;
      const storageRef = ref(storage, `userImages/${fileName}`);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { avatar: downloadURL });

      alert("Profile picture uploaded successfully.");
      // The onSnapshot listener will update userImage and localStorage
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setFileError("Failed to upload avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onRemoveClick = async () => {
    const confirmRemove = window.confirm("Are you sure you want to remove your profile picture?");
    if (!confirmRemove) return;

    setUploading(true);
    setFileError("");
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await userDocRef.get();
      const data = userDoc.exists() ? userDoc.data() : null;
      const avatarUrl = data?.avatar;

      if (avatarUrl) {
        const storage = getStorage();

        const decodedUrl = decodeURIComponent(avatarUrl);
        const matches = decodedUrl.match(/\/o\/([^?]+)/);
        if (matches && matches[1]) {
          const filePath = matches[1];
          const fileRef = ref(storage, filePath);
          await deleteObject(fileRef);
        }
      }

      await updateDoc(userDocRef, { avatar: null });

      alert("Profile picture removed.");
      // onSnapshot listener will update userImage and localStorage
    } catch (error) {
      console.error("Error removing avatar:", error);
      alert("Failed to remove profile picture. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Item
      className={cn(styles.card, className)}
      title="Profile information"
      classTitle="title-green"
    >
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src={userImage} alt="Avatar" />
          <button
            className={styles.remove}
            onClick={onRemoveClick}
            disabled={uploading}
            title="Remove profile picture"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.file}>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={onFileChange}
            style={{ display: "none" }}
            id="upload-input"
            disabled={uploading}
          />
          <label
            htmlFor="upload-input"
            className={cn("button", styles.button, { [styles.disabled]: uploading })}
          >
            <Icon name="add" size="24" />
            <span>{uploading ? "Uploading..." : "Upload new picture"}</span>
          </label>
        </div>
        {fileError && <div style={{ color: "red", marginTop: 8 }}>{fileError}</div>}
      </div>
      <div className={styles.fieldset}>
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            label="First Name"
            name="first-name"
            type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
            value={nameFirst}
            onChange={(e) => setNameFirst(e.target.value)}
          />
          <TextInput
            className={styles.field}
            label="Last Name"
            name="last-name"
            type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
            value={nameLast}
            onChange={(e) => setNameLast(e.target.value)}
          />
        </div>
        <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={email}
          readOnly
        />
      </div>
    </Item>
  );
};

export default ProfileInformation;