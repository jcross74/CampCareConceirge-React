// Users List Page Wrapper

import React, { useState, useEffect } from "react";
import styles from "./UserList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Filters from "../../components/Filters";
import Settings from "./Settings";
import Table from "./Table";
import Panel from "./Panel";
import Details from "./Details";
import { fetchUsers } from "../../mocks/users";

const navigation = ["Active", "New"];

const UserList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setData(usersData);
    };
    getUsers();
  }, []);


  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Users"
        classTitle={cn("title-purple", styles.title)}
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
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <Filters
              className={styles.filters}
              title="Showing 10 of 24 users"
            >
              <Settings />
            </Filters>
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

export default UserList;
