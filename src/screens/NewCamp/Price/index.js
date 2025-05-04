import React from "react";
import cn from "classnames";
import styles from "./Price.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";

const Price = ({
  className,
  campRegistrationURL,
  setCampRegistrationURL,
  campCost,
  setCampCost,
}) => {
  return (
    <Card
      className={cn(styles.card, className)}
      title="Price and Registration URL"
      classTitle="title-red"
    >
      <div className={styles.price}>
        <TextInput
          className={styles.field}
          label="Registration URL"
          name="campRegistrationURL"
          id="campRegistrationURL"
          type="text"
          tooltip="Enter the registration URL"
          value={campRegistrationURL}
          onChange={(e) => setCampRegistrationURL(e.target.value)}
        />

        <TextInput
          className={styles.field}
          label="Amount"
          name="campCost"
          id="campCost"
          type="text"
          tooltip="Enter the camp cost"
          currency="$"
          value={campCost}
          onChange={(e) => setCampCost(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default Price;