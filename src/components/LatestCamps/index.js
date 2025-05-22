// This file is the Popular Camps module

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import cn from "classnames";
import styles from "./PopularCamps.module.sass";
import { Link } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";

const LatestCamps = ({ className, views = Infinity }) => {
  const [camps, setCamps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const navigate = useNavigate();

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
            id: doc.id,
            campName: data.campName || "Untitled Camp",
            campStatus: data.campStatus || "Pending",
            campCity: data.campCity || "",
            campZip: data.campZip || "",
            campDescription: data.campDescription || "",
            campImage: data.campImage && data.campImage.length > 0
              ? data.campImage[0]
              : "/images/content/Camp_Image.png",
            campCost: data.campCost ? `$${parseFloat(data.campCost).toFixed(2)}` : "$0.00",
            image2x: data.campImage && data.campImage.length > 0
              ? data.campImage[0]
              : "/images/content/Camp_Image@2x.png",
            active: data.campStatus === "Approved",
            // Add any additional fields you'd like to pass to the modal here
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
        classTitle="title-red"
      >
        <div className={styles.popular}>
          <div className={styles.head}>
            <div className={styles.stage}>Camps</div>
            <div className={styles.stage}>Cost</div>
          </div>
          <div className={styles.list}>
            {camps.map((x, index) => {
              // Prepare campData for modal
              const campData = {
                ...x, // spread all camp fields
              };
              return (
                <div
                  className={styles.item}
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    console.log("Opening modal for camp:", campData.id);
                    setSelectedCamp(campData);
                    setModalOpen(true);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedCamp(campData);
                      setModalOpen(true);
                    }
                  }}
                >
                  <div className={styles.preview}>
                    <img
                      srcSet={`${x.image2x} 2x`}
                      src={x.campImage}
                      alt="Camp"
                    />
                  </div>
                  <div className={styles.title}>{x.campName}</div>
                  <div className={styles.details}>
                    <div className={styles.price}>{x.campCost}</div>
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
                </div>
              );
            })}
          </div>
          <Link
            className={cn("button-stroke", styles.button)}
            to="/admin/camps/dashboard"
          >
            All camps
          </Link>
        </div>
      </Card>
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedCamp && (
          <div className={styles.modalContent}>
            <h2 className={styles.campTitle}>{selectedCamp.campName}</h2>
            <p className={styles.campLocation}>{`${selectedCamp.campCity}, VA ${selectedCamp.campZip}`}</p>
            <div className={styles.modalImage}>
              <img className={styles.campImage} src={selectedCamp.campImage} alt={selectedCamp.campName} />
            </div>
            <p className={styles.campDescription}>{selectedCamp.campDescription}</p>
            
            <div className={styles.modalActions}>
              {selectedCamp.campStatus === "Pending" && (
                <button
                  className={styles.approveButton}
                  onClick={async () => {
                    const ref = doc(db, "camps", selectedCamp.id);
                    await updateDoc(ref, { campStatus: "Approved" });
                    alert("Camp approved");
                    setModalOpen(false);
                  }}
                >
                  Approve Camp
                </button>
              )}
              <button
                className={styles.editButton}
                onClick={() => {
                  setModalOpen(false);
                  navigate(`/admin/camps/edit`, { 
                    state: { 
                      campID: selectedCamp.id, 
                      campData: selectedCamp 
                    } 
                  });
                }}
              >
                Edit Camp
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default LatestCamps;