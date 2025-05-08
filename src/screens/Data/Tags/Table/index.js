import React, { useState, useEffect } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Loader from "../../../../components/Loader";
import Row from "./Row";

// data
import { fetchTags } from "../../../../mocks/tags";

const Table = ({ className }) => {
  const [chooseAll, setChooseAll] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      const data = await fetchTags();
      setTags(data);
      if (data.length > 0) setActiveId(data[0].id);
    };
    getTags();
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
        <div className={styles.row}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setChooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}> Tag</div>
        </div>
        {tags.map((x, index) => (
          <Row
            item={x}
            key={index}
            activeId={activeId}
            setActiveId={setActiveId}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      <div className={styles.foot}></div>
    </div>
  );
};

export default Table;
