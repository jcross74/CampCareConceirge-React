// This file is the Camps List with the checkboxes next the camp listings

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Camps.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Camp from "./Camp";
import { fetchCampData } from "../../../mocks/camp";

const Camps = () => {
  const navigation = ["Camp"];

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");
  const [campItems, setCampItems] = useState([]);

  useEffect(() => {
    const loadCamp = async () => {
      const cachedData = Cookies.get("campData");
      if (cachedData) {
        setCampItems(JSON.parse(cachedData));
        return;
      }
      const data = await fetchCampData();
      setCampItems(data);
    };
    loadCamp();
  }, []);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <Card
      className={styles.card}
      title="Camps"
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Search camps"
            type="text"
            name="search"
            icon="search"
          />
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          {activeTab === navigation[0] && <Camp items={campItems} />}
        </div>
      </div>
    </Card>
  );
};

export default Camps;