import React, { useState } from "react";
import styles from "./Camp.module.sass";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Row from "./Row";

const Camp = ({ items }) => {
  const [chooseAll, setСhooseAll] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const pagedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.market}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Camp</div>
          
          <div className={styles.col}>Venue</div>
          <div className={styles.col}>Location</div>
          <div className={styles.col}>Cost</div>
          <div className={styles.col}>Status</div>
        </div>
        {pagedItems.map((x, index) => (
          <Row
            item={{ ...x, status: x.campStatus }}
            key={index}
            up={items.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Camp;
