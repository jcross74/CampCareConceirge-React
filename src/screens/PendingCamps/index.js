import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./PendingCamps.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Table from "../../components/Table";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import { fetchPendingProducts } from "../../mocks/products";

const sorting = ["list", "grid"];

const Drafts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const loadPendingItems = async () => {
      const data = await fetchPendingProducts();
      setPendingItems(data);
    };
    loadPendingItems();
  }, []);

  const handleSubmit = (e) => {
    alert();
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Pending Camps"
        classTitle={cn("title-red", styles.title)}
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
        <div className={styles.wrapper}>
        {activeIndex === 0 && <Table items={pendingItems} title="Submitted" />}
          {activeIndex === 1 && (
            <>
              <div className={styles.list}>
                {pendingItems.map((x, index) => (
                  <Product
                    className={styles.product}
                    value={selectedFilters.includes(x.id)}
                    onChange={() => handleChange(x.id)}
                    item={x}
                    key={index}
                    released
                  />
                ))}
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke button-small", styles.button)}
                >
                  <Loader className={styles.loader} />
                  <span>Load more</span>
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Drafts;
