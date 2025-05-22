import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Dropdown from "../../components/Dropdown";
import ProfileInformation from "./ProfileInformation";
import Login from "./Login";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Cookies from "js-cookie";

const Settings = () => {
  const navigation = [
    {
      title: "Basics",
      action: () =>
        scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },
    // Add other tabs as needed, e.g. Password, etc.
  ];
  const options = [];
  navigation.forEach((x) => options.push(x.title));
  const [activeTab, setActiveTab] = useState(options[0]);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToProfile = useRef(null);
  const scrollToLogin = useRef(null);
  const scrollToNotifications = useRef(null);
  const scrollToPayment = useRef(null);

  const [userData, setUserData] = useState(null);

  // User info states
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [email, setEmail] = useState("");

  // New: Cache selected avatar file here
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const db = getFirestore();
      const userUID = Cookies.get("userUID");
      if (userUID) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("authID", "==", userUID));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setUserData(data);
          setNameFirst(data.nameFirst || "");
          setNameLast(data.nameLast || "");
          setEmail(data.email || "");
        }
      }
    };
    fetchUser();
  }, []);

  const handleClick = (x, index) => {
    setActiveIndex(index);
    x.action();
  };

  // New: handle file selected from ProfileInformation
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Save handler including avatar upload
  const handleSave = async () => {
    const db = getFirestore();
    const userUID = Cookies.get("userUID");
    if (!userUID) return;

    try {
      // Upload avatar if new file selected
      if (selectedFile) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const storage = getStorage();
        const ext = selectedFile.name.split(".").pop().toLowerCase();
        const fileName = `${user.uid}.${ext}`;
        const storageRef = ref(storage, `userImages/${fileName}`);

        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { avatar: downloadURL });

        // Refresh user data with new avatar URL
        setUserData((prev) => ({ ...prev, avatar: downloadURL }));
        setSelectedFile(null);
      }

      // Update other fields if changed
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("authID", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const docRef = userDoc.ref;
        const updates = {};
        if (nameFirst !== userDoc.data().nameFirst) updates.nameFirst = nameFirst;
        if (nameLast !== userDoc.data().nameLast) updates.nameLast = nameLast;

        if (Object.keys(updates).length > 0) {
          await updateDoc(docRef, updates);
          console.log("Changes have been saved.");
        }
      }
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.settings}>
        <div className={styles.menu}>
          {navigation.map((x, index) => (
            <button
              className={cn(styles.button, {
                [styles.active]: activeIndex === index,
              })}
              key={index}
              onClick={() => handleClick(x, index)}
            >
              {x.title}
            </button>
          ))}
        </div>
        <div className={styles.wrapper}>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={activeTab}
            setValue={setActiveTab}
            options={options}
          />
          <div className={styles.list}>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[0],
              })}
            >
              <div className={styles.anchor} ref={scrollToProfile}></div>
              <ProfileInformation
                userData={userData}
                nameFirst={nameFirst}
                nameLast={nameLast}
                email={email}
                setNameFirst={setNameFirst}
                setNameLast={setNameLast}
                onFileSelect={handleFileSelect} // Pass callback here
              />
            </div>
            {/* Other sections as needed */}
          </div>
          <button className={cn("button", styles.button)} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Settings;