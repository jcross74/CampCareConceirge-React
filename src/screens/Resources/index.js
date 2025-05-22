import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Resources.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Resources = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  
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
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">How do I find camps and activities in my area?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Use our customized search tool to find camps and activities based on location, age group, interests, and more.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">How often is your camp information updated?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          We work closely with our camp/activity partners to ensure our listings are accurate and up-to-date.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Can I search for camps based on my child’s interests?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Yes! Our search tool allows you to filter by interests, activities, location by zip code, and special themes to ensure you find the perfect fit.
        </AccordionDetails>
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