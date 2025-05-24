import React, { useState, useEffect } from "react";
import styles from "./PendingProviders.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Filters from "../../components/Filters";

import Table from "./Table";
import Panel from "./Panel";
import Details from "./Details";
import { fetchProviders } from "../../mocks/providers";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const navigation = ["Active", "New"];

const PendingProviders = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "providers"), (snapshot) => {
      const providersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(providersData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Pending Providers"
        classTitle={cn("title-red", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        head={
          <>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={() => handleSubmit()}
              placeholder="Search by name or email"
              type="text"
              name="search"
              icon="search"
            />
            
            
          </>
        }
      >
        {data.filter(p => p.providerStatus === "Pending").length > 0 ? (
          <div className={cn(styles.row, { [styles.flex]: visible })}>
            <Table
              className={styles.table}
              activeTable={visible}
              setActiveTable={setVisible}
              data={data.filter(p => p.providerStatus === "Pending")}
            />
            <Details
              className={styles.details}
              onClose={() => setVisible(false)}
            />
          </div>
        ) : (
          <div className={styles.noPending}>No pending providers at this time.</div>
        )}
      </Card>
      <Panel />
    </>
  );
};

export default PendingProviders;
