import React from "react";
import cn from "classnames";
import styles from "./File.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const File = ({
  className,
  label,
  tooltip,
  title,
  value,
  onChange,
  accept,
  multiple = false,
  ...rest
}) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (onChange) {
      onChange(files);
    }
  };

  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{" "}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        <input
          className={styles.input}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          {...rest}
        />
        <div className={styles.box}>
          <Icon name="upload" size="24" />
          {title}
        </div>
      </div>
      {value && value.length > 0 && (
        <ul>
          {value.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default File;