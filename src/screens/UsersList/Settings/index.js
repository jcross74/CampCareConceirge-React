import React, { useState } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Checkbox";
import { Range, getTrackBackground } from "react-range";

const options = ["All Users", "Admins", "Providers", "General Users"];




const Settings = ({ roleFilter, setRoleFilter, setFiltersOpen }) => {
  const [sorting, setSorting] = useState(roleFilter || "All Users");

  return (
    <div className={styles.settings}>
      
      <div className={styles.group}>
        <div className={styles.item}>
          <Dropdown
            className={styles.dropdown}
            classDropdownLabel={styles.label}
            value={sorting}
            setValue={setSorting}
            options={options}
            label="Filter by"
          />
        </div>
       
       
        <div className={styles.btns}>
          <button
            className={cn("button-stroke", styles.button)}
            onClick={() => {
              setRoleFilter("");
              setFiltersOpen(false);
            }}
          >
            Reset
          </button>
          <button
            className={cn("button", styles.button)}
            onClick={() => {
              setRoleFilter(sorting);
              setFiltersOpen(false);
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
