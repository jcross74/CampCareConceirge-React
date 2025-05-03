import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Contact.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";

const Contact = () => { 
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
            <h1>Contact Us</h1>
            </div>
        </section>
        <div className={styles.container}>
            <section className={styles.contactSection}>
            <div className={styles.intro}>
                <h2>Get in Touch</h2>
                <p>
                We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                </p>
            </div>
            <TextInput
                placeholder="Your message..."
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
export default Contact;