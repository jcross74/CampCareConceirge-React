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
          <h1>Committed to Excellence</h1>
        </div>
      </section>
<div className={styles.container}>
      <section className={styles.aboutSection}>
        <div className={styles.intro}>
          <div className={styles.imagePlaceholder}></div>
          <div className={styles.text}>
            <p>
              Camp Care Concierge was founded by three parents in Fairfax County
              who understand firsthand how challenging it can be to find clear,
              reliable information about local camps and activities. That’s why
              we spent over a year thoughtfully developing a customized search
              tool designed to make this process easier for families. Our goal
              is to provide accurate, consistent, and up-to-date information to
              help you confidently explore the best options for your child’s
              enrichment and enjoyment.
            </p>
            <h2>
              Our mission is to make finding the right camps and activities
              simple and stress-free—with clear, reliable info curated by
              parents, for parents.
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
              Built by parents who understand your needs, every feature is
              designed to make your search easier, faster, and more intuitive.
            </p>
          </div>
          <div className={styles.item}>
            <h4>Reliable</h4>
            <p>
              We provide accurate, up-to-date, and standardized details so you
              can make confident decisions without the guesswork.
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
              We focus on camps and activities in your community, offering
              insights and options tailored to where you live and what your
              family values.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.locations}>
        <h3>Locations We Cover</h3>
        <div className={styles.locationList}>
          <span>Falls Church</span>
          <span>Alexandria</span>
          <span>Springfield</span>
          <span>McLean</span>
          <span>Chantilly</span>
          <span>Great Falls</span>
          <span>Herndon</span>
        </div>
      </section>

      <section className={styles.newsletter}>
        <h3>Join Our Newsletter</h3>
        <p>
          Sign up for our newsletter to receive the latest local updates and
          recommendations delivered to your inbox.
        </p>
        <div className={styles.form}>
          <input type="email" placeholder="Your email" />
          <button className="button-red">Subscribe</button>
        </div>
      </section>
</div>
      <Footer />
    </>
  );
};

export default About;