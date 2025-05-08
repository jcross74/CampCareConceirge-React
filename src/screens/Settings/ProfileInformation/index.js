import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";

const ProfileInformation = ({ className }) => {
  const [content, setContent] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  return (
    <Item
      className={cn(styles.card, className)}
      title="Profile information"
      classTitle="title-green"
    >
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src="/images/content/Avatar-User.png" alt="Avatar" />
          <button className={styles.remove}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.file}>
          <input type="file" />
          <button className={cn("button", styles.button)} type="button">
            <Icon name="add" size="24" />
            <span>Upload new picture</span>
          </button>
        </div>
        <button className={cn("button-stroke", styles.button)}>Remove</button>
      </div>
      <div className={styles.fieldset}>
      <div className={styles.row}>
        <TextInput
          className={styles.field}
          label="First Name"
          name="first-name"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label="Last Name"
          name="last-name"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        </div>
        
        <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={email}
        />
        
        
      </div>
    </Item>
  );
};

export default ProfileInformation;
