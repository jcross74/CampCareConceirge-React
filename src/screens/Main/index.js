// src/screens/Main/index.js

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
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import Provide from "./Provide";
import Benefits from "./Benefits";
import Partner from "./Partner";

import { collection, getDocs, query, where, or } from "firebase/firestore";
import { db } from "../../firebase";

// mock data
import { products } from "../../mocks/products";
import { followers } from "../../mocks/followers";

// cache for user role
let cachedUserRole = null;
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
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  // Check & cache user role
  useEffect(() => {
    const checkUserRole = async () => {
      const userUID = getCookie("userUID");
      if (!userUID) return;
      if (cachedUserRole !== null) {
        document.cookie = `role=${cachedUserRole}; path=/;`;
        return;
      }
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("authID", "==", userUID));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          cachedUserRole = 0;
          document.cookie = "role=0; path=/;";
        } else {
          snapshot.forEach((doc) => {
            const data = doc.data();
            cachedUserRole = data.role;
            document.cookie = `role=${data.role}; path=/;`;
          });
        }
      } catch (err) {
        console.error("Error checking role:", err);
      }
    };
    checkUserRole();
  }, []);

  // Load autocomplete options from Firestore
  useEffect(() => {
    const loadOptions = async () => {
      const snapshot = await getDocs(collection(db, "camps"));
      const items = snapshot.docs.flatMap((doc) => {
        const data = doc.data();
        return [data.campCity ? `${data.campCity}, VA` : data.campCity, ...(data.campTags || [])];
      });
      const unique = [...new Set(items.filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      );
      setOptions(
        unique.map((val) => {
          const raw = String(val);
          // Convert to title case: capitalize each word
          const cleanText = raw.replace(/^[\[\]"']+|[\[\]"']+$/g, "");
          const titleCased = cleanText
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          return { value: titleCased };
        })
      );
    };
    loadOptions();
  }, []);

  const handleSubmit = async (searchValue) => {
    // Normalize the search term by removing any “, VA” suffix
    const term = searchValue.endsWith(", VA")
      ? searchValue.replace(/, VA$/, "")
      : searchValue;
    try {
      const campsRef = collection(db, "camps");
      const q = query(
        campsRef,
        or(
          where("campTags", "array-contains", term),
          where("campName", ">=", term),
          where("campName", "<=", term + "\uf8ff"),
          where("campCity", ">=", term),
          where("campCity", "<=", term + "\uf8ff")
        )
      );
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      navigate("/results", { state: { results, searchTerm: term } });
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
            <Autocomplete
              size="lg"
              label="Search Camps"
              placeholder="Search by camp name, activity or location"
              items={options}
              allowsCustomValue
              inputValue={search}
              onInputChange={(value) => setSearch(value)}
              onSelectionChange={(item) => {
                if (!item) return;
                let val = typeof item === "string" ? item : item.value;
                if (val.endsWith(", VA")) {
                  val = val.replace(/, VA$/, "");
                }
                setSearch(val);
              }}
              name="search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(search);
                }
              }}
            >
              {(option) => (
                <AutocompleteItem key={option.value}>
                  {option.value}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <button
              className={styles.searchButton}
              onClick={() => handleSubmit(search)}
            >
              Search
            </button>
            <div className={styles.dropdownBox}></div>
          </div>

          <div className={styles.wrap}>
            {activeIndex === 0 && (
              <div className={styles.products}>
                {products.map((x, i) => (
                  <Product
                    className={styles.product}
                    item={x}
                    key={i}
                    withoutСheckbox
                  />
                ))}
              </div>
            )}
            {activeIndex === 1 && (
              <>
                <div className={styles.followers}>
                  {followers.map((x, i) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={i}
                      followers
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn(
                      "button-stroke button-small",
                      styles.button
                    )}
                  >
                    Load more
                  </button>
                </div>
              </>
            )}
            {activeIndex === 2 && (
              <>
                <div className={styles.followers}>
                  {followers.map((x, i) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={i}
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn(
                      "button-stroke button-small",
                      styles.button
                    )}
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