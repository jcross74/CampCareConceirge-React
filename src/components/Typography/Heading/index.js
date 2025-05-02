import cn from "classnames";
import styles from "./heading.module.sass";

const headingType = {
  "heading-1": styles.h1,
  "heading-2": styles.h2,
  "heading-3": styles.h3,
  "heading-4": styles.h4,
  "heading-5": styles.h5,
  "heading-6": styles.h6,
};

export default function Heading({ type, className, children }) {
  return (
    <div className={cn(type, headingType[type], className)}>
      {children}
    </div>
  );
}