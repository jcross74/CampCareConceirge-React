import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../components/Icon";

const Panel = () => {
  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
        
        
      </div>
      <button className={cn("button", styles.button)}>Delete Provider</button>
    </div>
  );
};

export default Panel;
