// Details Modal Product Overview Component

import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Icon from "../../../../Icon";
import ModalPreview from "../../../../ModalPreview";
import { useLocation } from "react-router-dom";

const gallery = [
  "/images/content/photo-1.jpg",
  "/images/content/photo-2.jpg",
  "/images/content/photo-1.jpg",
  "/images/content/photo-2.jpg",
];

const features = [
  "128 prebuilt screens",
  "SaaS landing page ready",
  "Global styleguide",
  "Dark + light more ready",
];

const Overview = () => {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const location = useLocation();
  const { campName, campHost, docID } = location.state || {};

  return (
    <>
      <div className={styles.overview}>
        <div className={cn("h4", styles.title)}>
          {/* Camp name displayed here */}
          {campName ? campName : "Camp name not provided"}
          
        </div>
        <div className={styles.info}>
          {/* Camp host displayed here */}
          {campHost ? campHost : "Camp host not provided"}
        </div>
        <div className={styles.line}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <img src="/images/content/avatar.jpg" alt="Avatar" />
            </div>
            hosted by <span>{campHost ? campHost : "Unknown host"}</span>
          </div>
          <div className={styles.rating}>
            <Icon name="star-fill" size="24" />
            4.8
            <span className={styles.counter}>(87)</span>
          </div>
        </div>
        <div className={styles.gallery}>
          {gallery.map(
            (x, index) =>
              index < 1 && (
                <div className={styles.preview} key={index}>
                  <img src={x} alt="Product" />
                </div>
              )
          )}
          <button
            className={cn("button-white", styles.button)}
            onClick={() => setVisibleModalPreview(true)}
          >
            Show all preview
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={cn("title-red", styles.subtitle)}>Description</div>
            <div className={styles.content}>
              <p>
                Meet Node - a crypto NFT marketplace iOS UI design kit for
                Figma, Sketch, and Adobe XD. The kit includes 126 stylish mobile
                screens in light and dark mode, a bunch of crypto 3D
                illustrations, 1 SaaS landing page with full premade
                breakpoints, and hundreds of components to help you ship your
                next crypto, NFT product faster.
              </p>
              <p>
                Types of screens included: onboarding, connect wallet, home
                feed, profile, upload, menu, search, product detail,
                notification...
              </p>
              <p>
                If you have any questions or requests, please feel free to leave
                them all in the comments section.
              </p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={cn("title-purple", styles.subtitle)}>Tags</div>
            <ul className={styles.features}>
              {features.map((x, index) => (
                <li key={index}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        gallery={gallery}
        title={campName}
        figcaption={campHost}
        download
      />
    </>
  );
};

export default Overview;
