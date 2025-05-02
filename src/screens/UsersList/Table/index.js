import React, { useState, useEffect } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";

// data
import { fetchUsers } from "../../../mocks/users";

const Table = ({ className, activeTable, setActiveTable }) => {
  const [chooseAll, setChooseAll] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      if (data.length > 0) setActiveId(data[0].id);
    };
    getUsers();
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
              onChange={() => setChooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Name</div>
          <div className={styles.col}>Email</div>
          <div className={styles.col}>Member Since</div>
        </div>
        {users.map((x, index) => (
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
      <div className={styles.foot}></div>
    </div>
  );
};

export default Table;
