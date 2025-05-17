import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Item from "./Item";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Users from "../../../components/Users";
import Chart from "./Chart";

// Firestore imports
import { getFirestore, collection, getCountFromServer } from "firebase/firestore";
import { app } from "../../../firebase"; // Adjust this path if necessary

const db = getFirestore(app);

const intervals = ["All time", "In a year", "Per month"];

const Overview = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [campCount, setCampCount] = useState(0);

  // Fetch the number of documents in the "users" and "camps" collections with 2-hour cache
  useEffect(() => {
    const now = Date.now();
    const userCache = Cookies.get("userCount");
    const campCache = Cookies.get("campCount");

    if (userCache) {
      setUserCount(Number(userCache));
    } else {
      const usersCollection = collection(db, "users");
      getCountFromServer(usersCollection)
        .then((snapshot) => {
          const count = snapshot.data().count;
          Cookies.set("userCount", count, { expires: 1/12 }); // 2 hours
          setUserCount(count);
        })
        .catch((error) => {
          console.error("Error fetching user count:", error);
        });
    }

    if (campCache) {
      setCampCount(Number(campCache));
    } else {
      const campsCollection = collection(db, "camps");
      getCountFromServer(campsCollection)
        .then((snapshot) => {
          const count = snapshot.data().count;
          Cookies.set("campCount", count, { expires: 1/12 }); // 2 hours
          setCampCount(count);
        })
        .catch((error) => {
          console.error("Error fetching camp count:", error);
        });
    }
  }, []);

  // Build the navigation data with the dynamic counter value for Users
  const navData = [
    {
      title: "Users",
      counter: userCount, // Dynamically populated from Firestore
      icon: "profile-circle",
      color: "#B1E5FC",
      value: 37.8,
    },
    {
      title: "Camps",
      counter: campCount,
      icon: "activity",
      color: "#CABDFF",
      value: 37.8,
    },
  ];

  return (
    <Card
      className={cn(styles.card, className)}
      title="Overview"
      classTitle="title-red"
      
    >
      <div className={styles.overview}>
        <div className={styles.nav}>
          {navData.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndex,
              })}
              key={index}
              onActive={() => setActiveIndex(index)}
              item={x}
            />
          ))}
        </div>
        <div className={styles.body}>
          {activeIndex === 0 && <Users />}
          {activeIndex === 1 && <Chart />}
        </div>
      </div>
    </Card>
  );
};

export default Overview;