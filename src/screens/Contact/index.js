import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Contact.module.sass";
import TextInput from "../../components/TextInput";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import emailjs from "@emailjs/browser";

const Contact = () => { 
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        };

        const templateParams = {
            to_email: "jcross74@me.com",
            subject: "Contact Form Submission from Camp Care Site",
            ...data,
        };

        emailjs.send(
            "service_4qs3thx",     // replace with your EmailJS service ID
            "template_4o1mb2e",    // replace with your EmailJS template ID
            templateParams,
            "RsGElpQg75OeWUHDe"      // replace with your EmailJS public key
        )
        .then((result) => {
            console.log("Email successfully sent!", result.text);
            alert("Thank you! Your message has been sent.");
        }, (error) => {
            console.error("There was an error sending the email:", error.text);
            alert("Sorry, there was an error. Please try again.");
        });
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
                <h2>Thank you for your interest in Camp Care Concierge.</h2>
                <p>
                  At CampCare, our team is dedicated to making your experience seamless—from discovering top-rated camps to getting support every step of the way. Whether you’re a parent looking for the perfect program or a provider interested in listing your camp, we’d love to hear from you.
                </p>
                <p>Please provide us some details and one of our representatives will be sure to get back to you as soon as possible.</p>
              </div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Contact Form</h3>
                <TextInput name="firstName" placeholder="First Name" />
                <TextInput name="lastName" placeholder="Last Name" />
                <TextInput name="email" type="email" placeholder="Email" />
                <TextInput name="phone" type="tel" placeholder="Phone Number" />
                <TextInput name="message" placeholder="Your Message" textarea rows={4} />
                <button type="submit" className={styles.submitButton}>Submit</button>
              </form>
            </section>
        </div>
        <Footer />
        </>
    );
};

export default Contact;