// This file is the Camps List with the checkboxes next the camp listings

import React, { useState, useEffect } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Market from "./Market";
import Table from "./Table";

// data
import { traffic } from "../../../mocks/traffic";
import { viewers } from "../../../mocks/viewers";
import { fetchMarketData } from "../../../mocks/market";

const indicatorsTraffic = [
  {
    title: "Market",
    color: "#FFBC99",
  },
  {
    title: "Social media",
    color: "#CABDFF",
  },
  {
    title: "Direct",
    color: "#B5E4CA",
  },
  {
    title: "UI8",
    color: "#B1E5FC",
  },
  {
    title: "Others",
    color: "#FFD88D",
  },
];

const indicatorsViewers = [
  {
    title: "Followers",
    color: "#B5E4CA",
  },
  {
    title: "Others",
    color: "#CABDFF",
  },
];

const Camps = () => {
  const navigation = ["Market", "Traffic sources", "Viewers"];

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    const loadMarket = async () => {
      const data = await fetchMarketData();
      setMarketItems(data);
    };
    loadMarket();
  }, []);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <Card
      className={styles.card}
      title="Camps"
      classTitle={cn("title-purple", styles.title)}
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
          {activeTab === navigation[0] && <Market items={marketItems} />}
          {activeTab === navigation[1] && (
            <Table
              title="Traffic source"
              items={traffic}
              legend={indicatorsTraffic}
            />
          )}
          {activeTab === navigation[2] && (
            <Table title="Viewers" items={viewers} legend={indicatorsViewers} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Camps;