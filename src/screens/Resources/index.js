import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Resources.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";

const Resources = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (searchValue) => {
    console.log("Form submitted with value:", searchValue);
    // Add your search logic here
  };

  return (
    <>
      <MainNavigation />
      <div className={styles.mainContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Resources</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.resourcesSection}>
          <div className={styles.intro}>
            <h1>Explore Our Resources</h1>
            <p>
              Discover a curated list of resources to help you navigate the world of camps and activities.
            </p>
          </div>
          <TextInput
            placeholder="Search for resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
      </div>
      <Footer />
    </>
  );
}
export default Resources;