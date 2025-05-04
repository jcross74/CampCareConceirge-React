import React from "react";
import styles from "./AffiliateCenter.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Snapshot from "./Snapshot";
import LatestCamps from "../../components/LatestCamps";
import PerformanceByDay from "./PerformanceByDay";
import Table from "./Table";
import CreateLink from "./CreateLink";

const AffiliateCenter = () => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Snapshot className={styles.card} />
          <PerformanceByDay className={styles.card} />
          <Table className={styles.card} />
        </div>
        <div className={styles.col}>
          <CreateLink className={styles.card} />
          <LatestCamps className={styles.card} views="8" />
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default AffiliateCenter;
