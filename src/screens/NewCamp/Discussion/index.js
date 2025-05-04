// Attendees Card

import React from "react";
import cn from "classnames";
import styles from "./Discussion.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";

const genderOptions = ["Select", "Boys", "Girls", "Co-ed"];

const Discussion = ({
  className,
  campGenders,
  setCampGenders,
  campAgeMin,
  setCampAgeMin,
  campAgeMax,
  setCampAgeMax,
}) => {
  return (
    <Card
      className={cn(styles.card, className)}
      title="Attendees"
      classTitle="title-red"
    >
      <Dropdown
        className={cn(styles.field, styles.dropdownMargin)}
        label="Gender"
        name="campGenders"
        id="campGenders"
        tooltip="Only approved providers can be selected"
        value={campGenders}
        setValue={setCampGenders}
        options={genderOptions}
      />

      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="Min. Age"
          name="campAgeMin"
          id="campAgeMin"
          type="number"
          min="4"
          required
          value={campAgeMin}
          onChange={(e) => setCampAgeMin(e.target.value)}
        />
        <TextInput
          className={styles.field}
          label="Max. Age"
          name="campAgeMax"
          id="campAgeMax"
          type="number"
          min="5"
          required
          value={campAgeMax}
          onChange={(e) => setCampAgeMax(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default Discussion;