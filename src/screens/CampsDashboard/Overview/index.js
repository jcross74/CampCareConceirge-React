import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Balance from "../../../components/Balance";
import Chart from "./Chart";
import Cookies from "js-cookie";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { app } from "../../../firebase";

const intervals = ["This week", "This month", "This year"];

const Overview = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [campsCount, setCampsCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);

  // Real-time listener for total camps count with caching.
  useEffect(() => {
    const db = getFirestore(app);
    const campsRef = collection(db, "camps");

    const unsubscribe = onSnapshot(campsRef, (snapshot) => {
      const count = snapshot.size;
      const now = new Date().getTime();
      Cookies.set("campsCount", count.toString(), { expires: 1 / 720 }); // 2 minutes = 1/720 days
      Cookies.set("campsCountTimestamp", now.toString(), { expires: 1 / 720 });
      setCampsCount(count);
    }, (error) => {
      console.error("Error fetching camps count:", error);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Real-time listener for pending camps count with caching.
  useEffect(() => {
    const db = getFirestore(app);
    const campsRef = collection(db, "camps");
    const pendingQuery = query(campsRef, where("campStatus", "==", "Pending"));

    const unsubscribe = onSnapshot(pendingQuery, (snapshot) => {
      const count = snapshot.size;
      const now = new Date().getTime();
      Cookies.set("pendingCamps", count.toString(), { expires: 1 / 720 }); // 2 minutes = 1/720 days
      Cookies.set("pendingCampsTimestamp", now.toString(), { expires: 1 / 720 });
      setPendingCount(count);
    }, (error) => {
      console.error("Error fetching pending camps count:", error);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Build items array using dynamic values for camps counts.
  const items = [
    {
      title: "Total Camps",
      counter: campsCount !== null ? campsCount : "Loading...",
      icon: "activity",
      value: 37.8,
      background: "#edf8f2",
      
      
    },
    {
      title: "Pending Camps",
      // If count is fetched and greater than 0, display the count; if zero, display "None"; if not fetched, display "None".
      counter: pendingCount !== null
        ? pendingCount > 0
          ? pendingCount
          : "None"
        : "None",
      icon: "activity",
      value: -37.8,
      background: "#ecf9fe",
     
    },
    
  ];

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Overview"
        classTitle="title-green"
      >
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <Link
                to="#"
                className={styles.item}
                key={index}
                style={{ backgroundColor: x.background }}
              >
                <div className={styles.icon}>
                  <Icon name={x.icon} size="24" />
                </div>
                <div className={styles.line}>
                  <div className={styles.details}>
                    <div className={styles.category}>
                      {x.title}
                      
                    </div>
                    <div className={styles.counter}>{x.counter}</div>
                  </div>
                  <Chart className={styles.chart} item={x} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default Overview;