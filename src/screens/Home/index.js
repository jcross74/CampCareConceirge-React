import React from "react";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PopularProducts from "../../components/PopularProducts";
import Comments from "./Comments";
import RefundRequests from "../../components/RefundRequests";
import ProTips from "./ProTips";
import MoreCustomers from "./MoreCustomers";
import ProductViews from "./ProductViews";

const Home = () => {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Overview className={styles.card} />
                    <ProductViews className={styles.card} />
                   
                    
                </div>
                <div className={styles.col}>
                    <PopularProducts className={styles.card} views="7" />
                    <Comments className={styles.card} />
                    
                </div>
            </div>
            <TooltipGlodal />
        </>
    );
};

export default Home;
