// Main Front Facing page of the site (User Homepage)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Main.module.sass";
import Profile from "./Profile";
import Settings from "./Settings";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import Filters from "../../components/Filters";
import Product from "../../components/Product";
import Follower from "./Follower";
import MainNavigation from "../../components/MainNavigation";
import Footer from "../../components/Footer";
import Search from "../../components/Header/Search";
import Provide from "./Provide";
import Benefits from "./Benefits";
import Partner from "./Partner";
import Form from "../../components/Form";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

// data
import { products } from "../../mocks/products";
import { followers } from "../../mocks/followers";

const intervals = ["Most recent", "Most new", "Most popular"];

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sorting, setSorting] = useState(intervals[0]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const userUID = getCookie("userUID");
      console.log("Cookie value for userUID:", userUID);
      if (!userUID) return;

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("authID", "==", userUID));
        const snapshot = await getDocs(q);
        console.log("Number of user records returned:", snapshot.size);

        if (snapshot.empty) {
          document.cookie = "role=0; path=/;";
          console.log("Cookie set: role=0");
        } else {
          snapshot.forEach((doc) => {
            const data = doc.data();
            document.cookie = `role=${data.role}; path=/;`;
            console.log("Cookie set: role=" + data.role);
          });
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    checkUserRole();
  }, []);

  const handleSubmit = async (searchValue) => {
    console.log("Form submitted with value:", searchValue);
    try {
      const campsRef = collection(db, "camps");
      const snapshot = await getDocs(campsRef);
      const results = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const city = (data.campCity || "").toLowerCase();
        const description = (data.campDescription || "").toLowerCase();
        const name = (data.campName || "").toLowerCase();
        const venue = (data.campVenue || "").toLowerCase();
        const tag = (data.campTag || "").toLowerCase();

        const search = searchValue.toLowerCase();
        if (
          city.includes(search) ||
          description.includes(search) ||
          name.includes(search) ||
          venue.includes(search) ||
          tag.includes(search)
        ) {
          const fullData = { id: doc.id, ...doc.data() };
          console.log("Matched record:", fullData);
          results.push(fullData);
        }
      });

      console.log(`Search term: "${searchValue}", Matches: ${results.length}`);
      navigate("/results", { state: { results } });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <>
      <MainNavigation />
      <div className={styles.shop}>
        <div className={styles.background}>
          <div className={styles.overlayText}>
            <h1>Discover North Virginia’s Best Camps & Activities for Kids</h1>
          </div>
        </div>
        <Card className={styles.card}>
          <div className={styles.control}>
            <div className={styles.nav}>
              <Form
                className="formfull"
                value={search}
                setValue={setSearch}
                onSubmit={() => handleSubmit(search)}
                placeholder="Search by camp name, activity or location"
                type="text"
                name="search"
                icon="search"
              />
            </div>
            <div className={styles.dropdownBox}></div>
          </div>
          <div className={styles.wrap}>
            {activeIndex === 0 && (
              <>
                <div className={styles.products}>
                  {products.map((x, index) => (
                    <Product
                      className={styles.product}
                      item={x}
                      key={index}
                      withoutСheckbox
                    />
                  ))}
                </div>
              </>
            )}
            {activeIndex === 1 && (
              <>
                <div className={styles.followers}>
                  {followers.map((x, index) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={index}
                      followers
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    Load more
                  </button>
                </div>
              </>
            )}
            {activeIndex === 2 && (
              <>
                <div className={styles.followers}>
                  {followers.map((x, index) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={index}
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    Load more
                  </button>
                </div>
              </>
            )}
          </div>
        </Card>
        <Provide />
        <Benefits />
        <Partner />
      </div>
      <Footer />
    </>
  );
};

export default Main;