import React from "react";
import cn from "classnames";
import Cookies from "js-cookie";
import { fetchCampData } from "../../../mocks/camp";
import styles from "./Panel.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";

const Panel = ({ setVisiblePreview, setVisibleSchedule, campModified, onUpdate }) => {
  const actions = [
    {
      title: "Preview",
      icon: "expand",
      action: () => setVisiblePreview(true),
    },
    {
      title: "Schedule product",
      icon: "calendar",
      action: () => setVisibleSchedule(true),
    },
    {
      title: "Get shareable link",
      icon: "link",
      action: () => console.log("Get shareable link"),
    },
    {
      title: "Clear data",
      icon: "close",
      action: () => console.log("Clear data"),
    },
  ];

  const handleClick = async () => {
    await onUpdate();
    const updatedCampData = await fetchCampData();
    Cookies.set("campData", JSON.stringify(updatedCampData), { expires: 1 / 1440 });
    window.location.reload();
  };

  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
        <Icon name="check-all" size="24" />
        Updated <span>{campModified?.toDate().toLocaleDateString("en-US")}</span>
      </div>
      <div className={styles.btns}>
      <button className={cn("button-stroke-red", styles.button)}>
          <span>Delete</span>
          <Icon name="trash" size="24" />
        </button>
        <button className={cn("button", styles.button)} onClick={handleClick}>
          Update now
        </button>
        
      </div>
    </div>
  );
};

export default Panel;