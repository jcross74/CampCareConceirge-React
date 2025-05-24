import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./ProviderInformation.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";

const ProviderInformation = ({
  className,
  providerName,
  setProviderName,
  providerCity,
  setProviderCity,
  providerEmail,
  setProviderEmail,
  providerPhone,
  setProviderPhone,
  providerState,
  setProviderState,
  providerStatus,
  setProviderStatus,
  providerURL,
  setProviderURL,
  providerZip,
  setProviderZip,
  providerImages,
  setProviderImages,
  selectedFiles,
  setSelectedFiles,
}) => {
  return (
    <Card
      className={cn(styles.card, className)}
      title="Provider Information"
      classTitle="title-red"
      head={
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/admin/providers/overview"
        >
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput
          className={styles.field}
          label="Provider Name"
          name="providerName"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
        />

        <Dropdown
          className={cn(styles.field, styles.dropdown)}
          label="Status"
          options={["Pending", "Approved"]}
          value={providerStatus}
          setValue={setProviderStatus}
/>

        <TextInput
          className={styles.field}
          label="Phone"
          name="providerPhone"
          type="tel"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={providerPhone}
          onChange={(e) => setProviderPhone(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="Email"
          name="providerEmail"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={providerEmail}
          onChange={(e) => setProviderEmail(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="Provider Website"
          name="providerURL"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          value={providerURL}
          onChange={(e) => setProviderURL(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="City"
          name="providerCity"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={providerCity}
          onChange={(e) => setProviderCity(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="State"
          name="providerState"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={providerState}
          onChange={(e) => setProviderState(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="Zip"
          name="providerZip"
          type="text"
          tooltip="Maximum 5 characters. No HTML or emoji allowed"
          required
          value={providerZip}
          onChange={(e) => setProviderZip(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default ProviderInformation;