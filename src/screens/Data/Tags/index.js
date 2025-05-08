// Tags List Page Wrapper

import React, { useState, useEffect } from "react";
import styles from "./Tags.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Filters from "../../../components/Filters";
import Settings from "./Settings";
import Table from "./Table";
import Panel from "../../../components/ModalPreview/Panel";
import { fetchTags } from "../../../mocks/tags";

const TagsList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      const tagsData = await fetchTags();
      setData(tagsData);
    };
    getTags();
  }, []);


  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Tags"
        classTitle={cn("title-purple", styles.title)}
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

export default TagsList;
