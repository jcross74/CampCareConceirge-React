import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";

const ProfileInformation = ({
  className,
  nameFirst,
  nameLast,
  email,
  setNameFirst,
  setNameLast,
  handleSave,
}) => {
  const [content, setContent] = useState();

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
            value={nameFirst}
            onChange={(e) => setNameFirst(e.target.value)}
          />
          <TextInput
            className={styles.field}
            label="Last Name"
            name="last-name"
            type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
            value={nameLast}
            onChange={(e) => setNameLast(e.target.value)}
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
          readOnly
        />
      </div>
      
    </Item>
  );
};

export default ProfileInformation;