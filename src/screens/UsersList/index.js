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
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(usersData);
    });
    return () => unsubscribe();
  }, []);

  // Live search filter like PendingCamps
  const searchFiltered = search
    ? data.filter(user => {
        const searchLower = search.toLowerCase();
        return (
          (user.nameFirst && user.nameFirst.toLowerCase().includes(searchLower)) ||
          (user.nameLast && user.nameLast.toLowerCase().includes(searchLower)) ||
          (user.email && user.email.toLowerCase().includes(searchLower))
        );
      })
    : data;

  const roleFilterNumber =
    roleFilter === "Admins" ? 1 :
    roleFilter === "Providers" ? 2 :
    roleFilter === "General Users" ? 3 :
    null;

  const filteredData = roleFilterNumber
    ? searchFiltered.filter(user => String(user.role) === String(roleFilterNumber))
    : searchFiltered;

  const itemsPerPage = 20;
  const pageCount = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const pagedItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, pageCount));
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Users"
        classTitle={cn("title-purple", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        head={
          <div className={styles.searchAndFilterRow}>
            <form onSubmit={e => e.preventDefault()} className={styles.searchForm}>
              <Form
                className={styles.form}
                value={search}
                setValue={setSearch}
                placeholder="Search by name or email"
                type="text"
                name="search"
                icon="search"
                onSubmit={() => {}}
              />
            </form>
            <Filters className={styles.filters} visible={filtersOpen} onClose={() => setFiltersOpen(false)}>
              <Settings
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                setFiltersOpen={setFiltersOpen}
              />
            </Filters>
          </div>
        }
      >
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          <Table
            className={styles.table}
            activeTable={visible}
            setActiveTable={setVisible}
            data={pagedItems}
          />
          <Details
            className={styles.details}
            onClose={() => setVisible(false)}
          />
        </div>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === pageCount || pageCount === 0}>
            Next
          </button>
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default UserList;