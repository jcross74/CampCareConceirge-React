import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const users = [
  {
    title: "Camp Achva",
    avatar: "/images/content/avatar-camp1.png",
    url: "#",
  },
  {
    title: "Kids Give Back",
    avatar: "/images/content/avatar-camp2.png",
    url: "#",
  },
  {
    title: "Merritt Academy",
    avatar: "/images/content/avatar-camp3.png",
    url: "#",
  },
];

const Users = ({ className }) => {
  return (
    <div className={cn(styles.users, className)}>
      
      <div className={styles.list}>
        {users.map((x, index) => (
          <Link className={styles.item} key={index} to={x.url}>
            <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
            </div>
            <div className={styles.title}>{x.title}</div>
          </Link>
        ))}
        <Link className={styles.all} to="providers/overview">
          <div className={styles.icon}>
            <Icon name="arrow-right" size="24" />
          </div>
          <div className={styles.text}>View all</div>
        </Link>
      </div>
    </div>
  );
};

export default Users;
