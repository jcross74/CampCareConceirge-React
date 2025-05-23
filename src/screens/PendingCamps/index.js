import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./PendingCamps.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import Modal from "../../components/Modal";
import { getFirestore, doc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase";

const PendingCamps = () => {
  const [search, setSearch] = useState("");
  const [pendingItems, setPendingItems] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const itemsPerPage = 20;

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(collection(db, "camps"), where("campStatus", "==", "Pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendingItems(snapshot.docs.map(doc => ({ ...doc.data(), campID: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  // Filtering by search (across all fields)
  const filteredItems = pendingItems.filter((item) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      (item.campName && item.campName.toLowerCase().includes(query)) ||
      (item.campVenue && item.campVenue.toLowerCase().includes(query)) ||
      (item.campCity && item.campCity.toLowerCase().includes(query)) ||
      (item.campState && item.campState.toLowerCase().includes(query)) ||
      (item.campStatus && item.campStatus.toLowerCase().includes(query))
    );
  });

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Selection logic (optional, for checkboxes)
  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  // Approve selected camps
  const handleApprove = async () => {
    console.log("Approve action triggered:", selectedFilters);
    if (selectedFilters.length === 0) {
      alert("Please select at least one camp to approve.");
      return;
    }
    const db = getFirestore(app);

    // Only operate on the camps that are currently selected
    const toApprove = pendingItems.filter((item) => selectedFilters.includes(item.campID));
    try {
      await Promise.all(
        toApprove.map(async (camp) => {
          // If using the real campID from Firestore, change camp.id to camp.campID
          const docRef = doc(db, "camps", camp.campID);
          await updateDoc(docRef, { campStatus: "Approved" });
        })
      );
      setShowSuccessModal(true);

      // Remove approved camps from pendingItems list
      setPendingItems((prev) =>
        prev.filter((item) => !selectedFilters.includes(item.campID))
      );
      setSelectedFilters([]);
    } catch (err) {
      alert("An error occurred while approving camps.");
      console.error(err);
    }
  };

  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Pending Camps"
        classTitle={cn("title-red", styles.title)}
        head={
          <form onSubmit={e => e.preventDefault()}>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              placeholder="Search camps"
              type="text"
              name="search"
              icon="search"
            />
          </form>
        }
      >
        <div className={styles.wrapper}>
          <Table
            items={pagedItems}
            title="Submitted"
            selectedFilters={selectedFilters}
            onChange={handleChange}
          />
          {filteredItems.length === 0 && <div>No pending camps found.</div>}
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </Card>
      <Panel
        onApprove={handleApprove}
        selectedCount={selectedFilters.length}
      />
      <Modal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Camps Approved</h2>
          <p>The selected camps have been approved.</p>
          <button
            type="button"
            className={styles.approvalModalButton}
            onClick={() => setShowSuccessModal(false)}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PendingCamps;