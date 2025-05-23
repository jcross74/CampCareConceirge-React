// Table structure for Pending Camps

import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../Checkbox";
import Loader from "../Loader";
import Row from "./Row";

const Table = ({ items, title, selectedFilters, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            {/* "Select all" checkbox can be added here if you wish */}
          </div>
          <div className={styles.col}>Camp</div>
          <div className={styles.col}>Price</div>
          <div className={styles.col}>{title}</div>
        </div>
        {items.map((x, index) => (
          <Row
            item={x}
            key={x.campID || index}
            value={selectedFilters.includes(x.campID)}      // Controlled checked state
            onChange={() => onChange(x.campID)}             // Toggle for only this row
          />
        ))}
      </div>
      <div className={styles.foot}></div>
    </div>
  );
};

export default Table;
