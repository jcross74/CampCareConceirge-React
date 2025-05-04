import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../../components/Checkbox/index.js";
import Balance from "../../../../../components/Balance/index.js";
import ModalProduct from "../../../../../components/ModalProduct/index.js";
import Control from "../../Control/index.js";

import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item, value, onChange, up }) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
      <div className={styles.row} onMouseLeave={() => setVisibleActions(false)}>
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
            
          >
            <div className={styles.preview}>
              <img
                srcSet={`${item.image2x} 2x`}
                src={item.image}
                alt="Product"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.campName}</div>
              <div className={styles.wrap}>
                <div className={styles.price}>${item.campCost}</div>
                <div className={styles.category}>{item.campHost}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.col}>{item.campVenue}</div>

        <div className={styles.col}>
          <div className={styles.label}>Location</div>
         
            <div>{item.campCity}, {item.campState}</div>
            
          
        </div>

        
        <div className={styles.col}>
          <div className={styles.label}>Cost</div>
          <div className={styles.box}>
            <div className={styles.number}>
              ${(item.campCost)}
            </div>
            
          </div>
        </div>


        <div className={styles.col}>
          <div className={styles.label}>Status</div>
          {item.status ? (
            <div className={cn("status-green", styles.status)}>Approved</div>
          ) : (
            <div className={cn("status-red", styles.status)}>Pending</div>
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
