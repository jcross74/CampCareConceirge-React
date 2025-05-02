import { Link } from "react-router-dom";
import styles from "./logo.module.sass";
import cn from "classnames";

export default function Logo({ className }) {
  return (
    <Link href="/" className={cn(styles.logo, className)}>
      Camp Care Conceirge™
    </Link>
  );
}