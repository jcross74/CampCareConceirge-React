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
  const [allCampItems, setAllCampItems] = useState([]);
  const [campItems, setCampItems] = useState([]);

  useEffect(() => {
    const loadCamp = async () => {
      const cachedData = Cookies.get("campData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setAllCampItems(parsedData);
        setCampItems(parsedData);
        return;
      }
      const data = await fetchCampData();
      setAllCampItems(data);
      setCampItems(data);
    };
    loadCamp();
  }, []);

  useEffect(() => {
    if (!search) {
      setCampItems(allCampItems);
      return;
    }
    const filtered = allCampItems.filter((item) => {
      return (
        typeof item.campName === "string" &&
        item.campName.toLowerCase().includes(search.toLowerCase())
      );
    });
    setCampItems(filtered);
  }, [search, allCampItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional submit logic can be added here if needed
  };

  return (
    <Card
      className={styles.card}
      title="Camps"
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
      head={
        <form onSubmit={handleSubmit} className={styles.form}>
          <Form
            className={styles.search}
            value={search}
            setValue={setSearch}
            placeholder="Search camps"
            type="text"
            name="search"
          />
          {/* Optional submit button */}
          {/* <button type="submit">Search</button> */}
        </form>
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