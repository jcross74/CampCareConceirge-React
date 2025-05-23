import { Link } from "react-router-dom";
import styles from "./logo.module.sass";
import cn from "classnames";

export default function Logo({ className }) {
  return (
    <Link className={cn(styles.logo)}>
      Camp Care Concierge™
    </Link>
  );
}