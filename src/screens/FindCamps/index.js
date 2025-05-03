import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./FindCamps.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";

const FindCamps = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (searchValue) => {
        console.log("Form submitted with value:", searchValue);
        // Add your search logic here
    };
    
    return (
        <>
        <MainNavigation />
        <section className={styles.hero}>
            <div className={styles.heroContent}>
            <h1>Find Your Perfect Camp</h1>
            </div>
        </section>
        <div className={styles.container}>
            <section className={styles.findCampsSection}>
            <div className={styles.intro}>
                <h2>Discover Camps Tailored for Your Child</h2>
                <p>
                Explore a wide range of camps and activities designed to enrich your child's summer experience.
                </p>
            </div>
            <TextInput
                placeholder="Search for camps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSubmit={handleSubmit}
            />
            </section>
        </div>
        <Footer />
        </>
    );
}
export default FindCamps;