import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./ProviderList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Filters from "../../components/Filters";
import Settings from "./Settings";
import Table from "./Table";
import Panel from "./Panel";
import Details from "./Details";

const navigation = ["Active", "New"];

const ProviderList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  // Patched: filter against all possible field names
  const filteredData = search
    ? data.filter(provider =>
        (provider.nameFirst && provider.nameFirst.toLowerCase().includes(search.toLowerCase())) ||
        (provider.nameLast && provider.nameLast.toLowerCase().includes(search.toLowerCase())) ||
        (provider.email && provider.email.toLowerCase().includes(search.toLowerCase())) ||
        (provider.providerName && provider.providerName.toLowerCase().includes(search.toLowerCase())) ||
        (provider.providerEmail && provider.providerEmail.toLowerCase().includes(search.toLowerCase()))
      )
    : data;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "providers"), (snapshot) => {
      const providersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(providersData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Debug log: see what fields you have for search
    console.log("Provider data from Firestore:", data);
  }, [data]);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="All Providers"
        classTitle={cn("title-red", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        head={
          <form onSubmit={e => e.preventDefault()}>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={e => e.preventDefault()}
              placeholder="Search by name or email"
              type="text"
              name="search"
              icon="search"
            />
          </form>
        }
      >
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          <Table
            className={styles.table}
            activeTable={visible}
            setActiveTable={setVisible}
            data={filteredData}
          />
          <Details
            className={styles.details}
            onClose={() => setVisible(false)}
          />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default ProviderList;