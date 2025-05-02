import React, { useState, useEffect } from "react";
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
  where
} from "firebase/firestore";
import { app } from "../../../firebase";

const intervals = ["This week", "This month", "This year"];

const Overview = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [campsCount, setCampsCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);

  // Fetch total camps count from Firestore and cache for 24 hours.
  useEffect(() => {
    let isMounted = true;
    const expiration = 2 * 60 * 60 * 1000; // 2 hours in ms
    const now = new Date().getTime();

    const cachedCount = Cookies.get("campsCount");
    const cachedTimestamp = Cookies.get("campsCountTimestamp");

    if (
      cachedCount &&
      cachedTimestamp &&
      now - parseInt(cachedTimestamp, 10) < expiration
    ) {
      if (isMounted) {
        setCampsCount(parseInt(cachedCount, 10));
      }
    } else {
      const fetchCampsCount = async () => {
        try {
          const db = getFirestore(app);
          const campsRef = collection(db, "camps");
          const snapshot = await getDocs(campsRef);
          const count = snapshot.size;
          Cookies.set("campsCount", count.toString(), { expires: 1 });
          Cookies.set("campsCountTimestamp", now.toString(), { expires: 1 });
          if (isMounted) {
            setCampsCount(count);
          }
        } catch (error) {
          console.error("Error fetching camps count:", error);
        }
      };
      fetchCampsCount();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Pending Camps count from Firestore and cache for 1 hours.
  useEffect(() => {
    let isMounted = true;
    const expiration = 1 * 60 * 60 * 1000; // 1 hours in ms
    const now = new Date().getTime();

    const cachedPending = Cookies.get("pendingCamps");
    const cachedPendingTimestamp = Cookies.get("pendingCampsTimestamp");

    if (
      cachedPending &&
      cachedPendingTimestamp &&
      now - parseInt(cachedPendingTimestamp, 10) < expiration
    ) {
      if (isMounted) {
        setPendingCount(parseInt(cachedPending, 10));
      }
    } else {
      const fetchPendingCount = async () => {
        try {
          const db = getFirestore(app);
          const campsRef = collection(db, "camps");
          const pendingQuery = query(campsRef, where("campStatus", "==", "Pending"));
          const snapshot = await getDocs(pendingQuery);
          const count = snapshot.size;
          Cookies.set("pendingCamps", count.toString(), { expires: 1/24 }); // Expires in 1 hours (1/24 days)
          Cookies.set("pendingCampsTimestamp", now.toString(), { expires: 1/24 });
          if (isMounted) {
            setPendingCount(count);
          }
        } catch (error) {
          console.error("Error fetching pending camps count:", error);
        }
      };
      fetchPendingCount();
    }

    return () => {
      isMounted = false;
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
      icon: "shopping-bag",
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
              <div
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
                      <Tooltip
                        className={styles.tooltip}
                        title="Small description"
                        icon="info"
                        place="right"
                      />
                    </div>
                    <div className={styles.counter}>{x.counter}</div>
                    
                  </div>
                  <Chart className={styles.chart} item={x} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default Overview;