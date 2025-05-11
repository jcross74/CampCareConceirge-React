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

    const handleCategoryClick = (categoryName) => {
      navigate(`/results?tag=${encodeURIComponent(categoryName)}`);
    };
    
    return (
        <>
        <MainNavigation />
        <div className={styles.container}>
        <section className={styles.hero}>
            <div className={styles.heroContent}>
            <h1>Find Your Perfect Camp</h1>
            </div>
        </section>
        <div className={styles.container}>
            <section className={styles.findCampsSection}>
             <section className={styles.categoriesSection}>
              <div className={styles.campContent}>
              <h2>Find the Perfect Camp for Every Interest</h2>
              <p>Looking for a fun, safe, and enriching camp experience for your child? You’re in the right place. At Camp Care Concierge, we make it easy for parents to explore and discover a wide variety of summer camps and year-round programs tailored to every child’s passion and personality.</p>
              <p>Whether your child is into sports, STEM and educational activities, nature exploration, creative arts, virtual gaming, or even cooking and culinary fun, our platform helps you quickly find the perfect fit. Search by category, age group, location, or schedule—everything you need is at your fingertips.</p>
              <p>With hundreds of curated listings, trusted reviews, and helpful filters, finding the right camp has never been easier. Start exploring today and give your child a summer (or season) full of growth, friendship, and unforgettable memories.</p>
              </div>
              <div className={styles.grid}>
                {[
                  { name: "Sports", image: "/images/categories/sports.png" },
                  { name: "Educational", image: "/images/categories/educational.png" },
                  { name: "Nature", image: "/images/categories/nature.png" },
                  { name: "Gaming", image: "/images/categories/gaming.png" },
                  { name: "Virtual", image: "/images/categories/virtual.png" },
                  { name: "Cooking", image: "/images/categories/cooking.png" },
                ].map((cat) => (
                  <div key={cat.name} className={styles.tile} onClick={() => handleCategoryClick(cat.name)}>
                    <img src={cat.image} alt={cat.name} />
                    <div className={styles.label}>{cat.name}</div>
                  </div>
                ))}
              </div>
            </section>
            </section>
        </div>
        </div>
        <Footer />
        </>
    );
}
export default FindCamps;