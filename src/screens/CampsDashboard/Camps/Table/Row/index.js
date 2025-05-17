import React, { useState } from "react";
import styles from "./Row.module.sass";
import Checkbox from "../../../../../components/Checkbox";
import Control from "../../Control";
import { Link } from "react-router-dom";

const Row = ({ item, value, onChange, up }) => {
    const [visibleActions, setVisibleActions] = useState(false);

    return (
        <>
            <div
                className={styles.row}
                onMouseLeave={() => setVisibleActions(false)}
            >
                <div className={styles.col}>
                    <Checkbox
                        className={styles.checkbox}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.col}>
                    <Link to="#" className={styles.item}>
                        <div className={styles.preview}>
                            <img
                                srcSet={`${item.image2x} 2x`}
                                src={item.image}
                                alt="Camp"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.product}>{item.product}</div>
                            <div className={styles.date}>{item.date}</div>
                        </div>
                    </Link>
                </div>
                <div className={styles.col}>
                    <div
                        className={styles.line}
                        style={{ width: item.progress }}
                    >
                        {item.items.map((x, index) => (
                            <div
                                className={styles.box}
                                style={{
                                    backgroundColor: x.color,
                                    width: x.width,
                                }}
                                key={index}
                            >
                                <div className={styles.tooltip}>
                                    <div className={styles.subtitle}>
                                        {x.title}
                                    </div>
                                    <div className={styles.legend}>
                                        <div
                                            className={styles.color}
                                            style={{ backgroundColor: x.color }}
                                        ></div>
                                        <div className={styles.counter}>
                                            {(x.counter / 1000).toFixed(0)}k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Control
                        className={styles.control}
                        visibleActions={visibleActions}
                        setVisibleActions={setVisibleActions}
                        up={up}
                    />
                </div>
            </div>
        </>
    );
};

export default Row;
