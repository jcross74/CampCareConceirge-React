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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Are there camps for specific age groups or skill levels?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Absolutely. You can filter camps by age, skill level, and experience to match your child’s needs.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Do you list both day camps and overnight camps?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Yes! Our search tool allows you to filter by interests, activities, location by zip code, and special themes to ensure you find the perfect fit.
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
          No, right now we are focused on local day only campus, but we plan on expanding that to overnight and away camps for V2.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Are the camps on your site verified?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          We prioritize reliable, trusted camps, but we always recommend doing your own research before enrolling.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Can I save my favorite camps for later?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Currently, we are working on that feature which will allow you to save and compare camps……stay tuned for more soon!
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">How do I contact a camp directly?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Each camp listing includes all necessary contact information so you can reach out directly with any questions or to enroll/register.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Are there camps for children with special needs or specific support requirements?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Yes, you can find camps that specialize in accommodating various needs and support levels.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Can I suggest a camp to be added to the directory?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Absolutely! We’re always looking to expand our listings. Just reach out to us with the camp’s details.
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