// Seasons List Page Wrapper

import React, { useState, useEffect } from "react";
import styles from "./Seasons.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Filters from "../../../components/Filters";
import Table from "./Table";
import Panel from "../../../components/ModalPreview/Panel";
import { fetchSeasons } from "../../../mocks/seasons";

const SeasonsList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getSeasons = async () => {
      const seasonsData = await fetchSeasons();
      setData(seasonsData);
    };
    getSeasons();
  }, []);


  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Seasons"
        classTitle={cn("title-green", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        head={
          <>
            
          </>
        }
      >
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          <Table
            className={styles.table}
            activeTable={visible}
            setActiveTable={setVisible}
            data={data}
          />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default SeasonsList;
