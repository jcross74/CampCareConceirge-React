// This file is the Popular Camps module

import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./PopularCamps.module.sass";
import { Link } from "react-router-dom";
import Card from "../Card";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust this path if your firebase config is elsewhere

const LatestCamps = ({ className, views }) => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const campsRef = collection(db, "camps");
        const q = query(campsRef, orderBy("campModified", "desc"), limit(7));
        const querySnapshot = await getDocs(q);
        console.log("Number of camps fetched:", querySnapshot.size);
        const fetchedCamps = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            title: data.campName || "Untitled Camp",
            price: data.campCost ? `$${parseFloat(data.campCost).toFixed(2)}` : "$0.00",
            active: data.campStatus === "Approved",
            image:
              data.campImage && data.campImage.length > 0
                ? data.campImage[0]
                : "/images/content/Camp_Image.png",
            image2x:
              data.campImage && data.campImage.length > 0
                ? data.campImage[0]
                : "/images/content/Camp_Image@2x.png",
          };
        });
        setCamps(fetchedCamps);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };

    fetchCamps();
  }, []);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Latest Camps"
        classTitle="title-yellow"
      >
        <div className={styles.popular}>
          <div className={styles.head}>
            <div className={styles.stage}>Camps</div>
            <div className={styles.stage}>Cost</div>
          </div>
          <div className={styles.list}>
            {camps.map(
              (x, index) =>
                views > index && (
                  <Link
                    to="#"
                    className={styles.item}
                    key={index}
                  >
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Camp"
                      />
                    </div>
                    <div className={styles.title}>{x.title}</div>
                    <div className={styles.details}>
                      <div className={styles.price}>{x.price}</div>
                      {x.active ? (
                        <div className={cn("status-green", styles.status)}>
                          Approved
                        </div>
                      ) : (
                        <div className={cn("status-red", styles.status)}>
                          Pending
                        </div>
                      )}
                    </div>
                  </Link>
                )
            )}
          </div>
          <Link
            className={cn("button-stroke", styles.button)}
            to="/admin/camps/dashboard"
          >
            All camps
          </Link>
        </div>
      </Card>
    </>
  );
};

export default LatestCamps;