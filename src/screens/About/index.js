import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./About.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";

const About = () => {
  return (
    <>
      <MainNavigation />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Us</h1>
        </div>
      </section>
<div className={styles.container}>
      <section className={styles.aboutSection}>
        <div className={styles.intro}>
          <div className={styles.imagePlaceholder}></div>
          <div className={styles.text}>
            <p>
              Camp Care Concierge was founded by three Fairfax County parents who know how challenging it can be to find clear, reliable information about local camps and activities. That’s why we dedicated two years to thoughtfully develop a customized search tool that makes the data collection process simpler for families. Our goal is to provide accurate, consistent, and up-to-date information, helping you confidently choose the best options for your child’s growth and enjoyment.
            </p>
            <h2>
              Our mission is simple – to take the stress out of finding camps and activities, with trusted, parent-curated information that you can rely on.
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <h3>Our Values</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h4>Parent-Centered</h4>
            <p>
              Our search feature was crafted by local parents who understand what truly matters – the safety and happiness of your children. We set out to transform a complicated, often chaotic process into something faster, simpler, and more intuitive, freeing up your time for what matters most.
            </p>
          </div>
          <div className={styles.item}>
            <h4>Reliable</h4>
            <p>
              Our search feature delivers precise, up-to-date, and local standardized  information, empowering you to make confident decisions on camps and actitives.
            </p>
          </div>
          <div className={styles.item}>
            <h4>Time-Saving</h4>
            <p>
              Our platform streamlines your search process—filter, compare, and
              find the right fit in just a few clicks.
            </p>
          </div>
          <div className={styles.item}>
            <h4>Local Expertise</h4>
            <p>
              Designed for Fairfax County families, our search tool provides hyper-local results, helping to support small businesses and larger camp providers in our community, with insights that match your family’s needs and interests.
            </p>
          </div>
        </div>
      </section>

      

      
</div>
      <Footer />
    </>
  );
};

export default About;