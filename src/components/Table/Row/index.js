// Pending Camps Table Row Component

import React, { useState } from "react";
import styles from "./Row.module.sass";
import Checkbox from "../../Checkbox";
import ModalProduct from "../../ModalProduct";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Modal from "../../Modal";
import Schedule from "../../Schedule";
import Control from "./Control";
import { useNavigate } from "react-router-dom";

const Row = ({ item, value, onChange }) => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const [selectedCampName, setSelectedCampName] = useState("");
    const [selectedCampHost, setSelectedCampHost] = useState("");

    const [visibleModalProduct, setVisibleModalProduct] = useState(false);
    const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);

    const actions = [
        {
            title: "Schedule product",
            icon: "calendar",
            action: () => setVisibleModalSchedule(true),
        },
        {
            title: "Edit title & description",
            icon: "edit",
            action: () => console.log("Edit title & description"),
        },
        {
            title: "Delete forever",
            icon: "trash",
            action: () => console.log("Delete forever"),
        },
    ];

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
                        onClick={() => {
                            navigate("/admin/camps/edit", { state: { campID: item.campID } });
                        }}
                    >
                        <div className={styles.preview}>
                            <img
                                src={
                                    item.campImages && item.campImages.length > 0
                                        ? item.campImages[0]
                                        : "../../images/content/Camp_Image.png"
                                }
                                srcSet={
                                    item.campImages && item.campImages.length > 0
                                        ? `${item.campImages[0]} 2x`
                                        : "../../images/content/Camp_Image@2x.png 2x"
                                }
                                alt="Camp Preview"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.product}>{item.campName}</div>
                            <div className={styles.link}>{item.campHost}</div>
                            <div className={styles.date}>
                                <Icon name="clock" size="20" /> {item.date}
                            </div>
                        </div>
                    </div>
                    <Actions
                        className={styles.actions}
                        classActionsHead={styles.actionsHead}
                        items={actions}
                    />
                </div>
                <div className={styles.col}>
                    {item.campCost && item.campCost > 0 ? (
                        <div className={styles.price}>${item.campCost}</div>
                    ) : (
                        <div className={styles.empty}>$0</div>
                    )}
                </div>
                <div className={styles.col}>
                    {item.campModified && item.campModified.toDate
                        ? item.campModified.toDate().toLocaleDateString()
                        : ""}
                </div>
            </div>
            <ModalProduct
                visible={visibleModalProduct}
                onClose={() => setVisibleModalProduct(false)}
                item={item}
                campName={selectedCampName}
                campHost={selectedCampHost}
            />
            <Modal
                visible={visibleModalSchedule}
                onClose={() => setVisibleModalSchedule(false)}
            >
                <Schedule
                    startDate={startDate}
                    setStartDate={setStartDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                />
            </Modal>
        </>
    );
};

export default Row;