import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Dropdown from "../../components/Dropdown";
import ProfileInformation from "./ProfileInformation";
import Login from "./Login";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const Settings = () => {
  const navigation = [
    {
      title: "Basics",
      action: () =>
        scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Login",
      action: () =>
        scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    
   
  ];
  const options = [];
  navigation.map((x) => options.push(x.title));
  const [activeTab, setActiveTab] = useState(options[0]);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToProfile = useRef(null);
  const scrollToLogin = useRef(null);
  const scrollToNotifications = useRef(null);
  const scrollToPayment = useRef(null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("authID", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      }
    };

    fetchUser();
  }, []);

  const handleClick = (x, index) => {
    setActiveIndex(index);
    x.action();
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
              <ProfileInformation userData={userData} />
            </div>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[1],
              })}
            >
              <div className={styles.anchor} ref={scrollToLogin}></div>
              <Login userData={userData} />
            </div>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[2],
              })}
            >
             
              
            </div>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[3],
              })}
            >
              
              
            </div>
          </div>
          <button className={cn("button", styles.button)}>Save</button>
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Settings;
