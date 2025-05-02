import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Balance from "../../../../components/Balance";
import ModalProduct from "../../../../components/ModalProduct";

import { numberWithCommas } from "../../../../utils.js";

const Row = ({ item, value, onChange }) => {
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div
            className={styles.item}
            onClick={() => setVisibleModalProduct(true)}
          >
            <div className={styles.preview}>
              <img
                srcSet={`${item.image2x} 2x`}
                src={item.image}
                alt="Camp"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.campName}</div>
              <div className={styles.wrap}>
                <div className={styles.price}>${item.price}</div>
                <div className={styles.category}>{item.campHost}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.col}>
          <div className={styles.label}>Venue</div>
          <div className={styles.product}>{item.campVenue}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Sales</div>
          <div className={styles.product}>{item.campCity}</div> <div className={styles.product}>{item.campState}</div>
        </div>
        <div className={styles.col}>${item.campCost}</div>
        <div className={styles.col}>
          <div className={styles.label}>Status</div>
          {item.status ? (
            <div className={cn("status-green", styles.status)}>Active</div>
          ) : (
            <div className={cn("status-red", styles.status)}>Deactive</div>
          )}
        </div>
        
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Row;
