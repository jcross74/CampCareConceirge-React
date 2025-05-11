import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Resources.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import { Accordion, AccordionItem } from "@heroui/react";

const Resources = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (searchValue) => {
    console.log("Form submitted with value:", searchValue);
    // Add your search logic here
  };

  const data = {
    rows: [
      {
        title: "What is Camp Care Concierge?",
        content: "Camp Care Concierge helps parents discover and connect with camps and activities that best suit their child’s interests."
      },
      {
        title: "How do I find a camp?",
        content: "Use the search bar or explore categories to browse available camps. You can filter by location, age group, or camp type."
      },
      {
        title: "Is there a cost to use the service?",
        content: "Camp Care Concierge is free for parents. Providers may pay to list or promote their camps."
      }
    ]
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
            
          </div>
          
          <div className={styles.faq}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <Accordion variant="shadow" className={cn(styles.accordion, styles.shadow)}>
              {data.rows.map((item, index) => (
                <AccordionItem
                  key={index}
                  aria-label={`accordion-${index}`}
                  title={item.title}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      </div>
      <Footer />
    </>
  );
}
export default Resources;