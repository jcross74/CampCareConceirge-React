import React from "react";
import styles from "./Footer.module.sass";
import cn from "classnames";
import Logo from "../Logo"
import { Heading } from "../Typography";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "../../constants/icons";

const links = [
  {
    id: 1,
    title: "Home",
    url: "#",
  },
  {
    id: 2,
    title: "Camp Login",
    url: "#",
  },
  {
    id: 3,
    title: "List Your Camp",
    url: "#",
  },
  {
    id: 4,
    title: "Contact Us",
    url: "#",
  },
  {
    id: 5,
    title: "Camp Categories",
    url: "#",
  },
  {
    id: 6,
    title: "Partner With Us",
    url: "#",
  },
  {
    id: 7,
    title: "Camp Locations",
    url: "#",
  },
  {
    id: 8,
    title: "Blog",
    url: "#",
  },
  {
    id: 9,
    title: "Parent Resources",
    url: "#",
  },
];

const socials = [
  {
    id: 1,
    icon: Instagram,
    title: "Instagram",
    url: "#",
  },
  {
    id: 2,
    icon: Facebook,
    title: "Facebook",
    url: "#",
  },
  {
    id: 3,
    icon: Linkedin,
    title: "Linkedin",
    url: "#",
  },
  {
    id: 4,
    icon: Youtube,
    title: "Youtube",
    url: "#",
  },
];

export default function Footer() {
  return (
    <footer className={cn("section", styles.section)}>
      <div className={cn("container-foot", styles.container)}>
        <div className={styles.content}>
          <Logo />

          <div>
            <Heading type="heading-3" className={styles.title}>
              Connecting Families to Camps & Activities
            </Heading>
            <div className={cn("subheading-small", styles.email)}>
              hello@campcareconceirge.com
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.business_info}>
            <div>
              <div className={cn("paragraph-small", styles.address)}>
                123 Main Street, Hometown, USA
              </div>
              <div className={cn("paragraph-small", styles.phone)}>
                (123) 456-7890
              </div>
            </div>

            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className={cn("paragraph-small", styles.copyright)}>
              © 2025 Camp Care Conceirge. All rights reserved.
            </div>
          </div>

          <div className={styles.links}>
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className={cn("label-medium", styles.link)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}