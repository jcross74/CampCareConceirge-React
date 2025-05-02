import React, { useState, useEffect } from "react";
import styles from "./Market.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";

// data
import { fetchReleasedData } from "../../../mocks/market";

const Market = () => {
  const [chooseAll, setСhooseAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [releasedItems, setReleasedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReleasedData();
      setReleasedItems(data);
    };
    fetchData();
  }, []);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

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
        {releasedItems.map((x, index) => (
          <Row
            item={x}
            key={index}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      <div className={styles.foot}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Load more</span>
        </button>
      </div>
    </div>
  );
};

export default Market;
