import React, { useState } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Checkbox";
import { Range, getTrackBackground } from "react-range";

const options = ["Admins", "Providers", "General Users"];




const Settings = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState(options[0]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [values, setValues] = useState([223, 384]);

  const handleSubmit = (e) => {
    alert();
  };

  const handleChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== filter));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, filter]);
    }
  };

  return (
    <div className={styles.settings}>
      <Form
        className={styles.form}
        value={search}
        setValue={setSearch}
        onSubmit={() => handleSubmit()}
        placeholder="Filter for users"
        type="text"
        name="search"
        icon="search"
      />
      <div className={styles.group}>
        <div className={styles.item}>
          <Dropdown
            className={styles.dropdown}
            classDropdownLabel={styles.label}
            value={sorting}
            setValue={setSorting}
            options={options}
            label="Sort by"
          />
        </div>
       
       
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.button)}>Reset</button>
          <button className={cn("button", styles.button)}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
