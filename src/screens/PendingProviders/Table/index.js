import React, { useState, useEffect } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";

// data
import { fetchProviders } from "../../../mocks/providers";

const Table = ({ className, activeTable, setActiveTable }) => {
  const [providers, setProviders] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [chooseAll, setСhooseAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const loadProviders = async () => {
      const data = await fetchProviders();
      setProviders(data);
      if (data.length > 0) setActiveId(data[0].id);
    };
    loadProviders();
  }, []);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.table)}>
        <div className={cn(styles.row, { [styles.active]: activeTable })}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Provider</div>
          <div className={styles.col}>Phone</div>
          <div className={styles.col}>Email</div>
          <div className={styles.col}>City</div>
          <div className={styles.col}>State</div>
          <div className={styles.col}>Status</div>
        </div>
        {Array.isArray(providers) && providers.map((x, index) => (
          <Row
            item={x}
            key={index}
            activeTable={activeTable}
            setActiveTable={setActiveTable}
            activeId={activeId}
            setActiveId={setActiveId}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      <div className={styles.foot}>
        
      </div>
    </div>
  );
};

export default Table;
