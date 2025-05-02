import React from "react";
import styles from "./CampsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import ProductActivity from "./ProductActivity";
import ProductViews from "./ProductViews";
import Camps from "./Products";

const CampsDashboard = () => {
    return (
        <>
            <div className={styles.section}>
                <Overview className={styles.card} />
                
                <Camps />
            </div>
            <TooltipGlodal />
        </>
    );
};

export default CampsDashboard;