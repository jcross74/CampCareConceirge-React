import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase"; 
import { progress } from "../utils";
import Cookies from "js-cookie";

export const fetchMarketData = async () => {
  const cached = Cookies.get("marketData");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Invalid cache, refetching data.");
    }
  }

  const snapshot = await getDocs(collection(db, "camps"));
  const market = [];

  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const image = data.campImage?.[0] || "/images/content/placeholder-pic.png";
    const image2x = data.campImage?.[0] || "/images/content/placeholder-pic@2x.png";

    market.push({
      id: index,
      campName: data.campName || "",
      campHost: data.campProvider || "",
      campCost: Number(data.campCost) || 0,
      status: data.campStatus === "Approved",
      campCity: data.campCity || "",
      campState: data.campState || "",
      campVenue: data.campVenue || "",
      category: data.campTags?.[0] || "",
      image,
      image2x,
    });
  });

  Cookies.set("marketData", JSON.stringify(market), { expires: 1 / 1440 }); // 1 minute
  return market;
};

export const fetchReleasedData = async () => {
  const snapshot = await getDocs(
    query(collection(db, "camps"), where("campStatus", "==", "Approved"))
  );
  const released = [];

  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const image = data.campImage?.[0] || "/images/content/placeholder-pic.png";
    const image2x = data.campImage?.[0] || "/images/content/placeholder-pic@2x.png";

    released.push({
      id: index,
      campName: data.campName || "",
      campHost: data.campProvider || "",
      campCost: Number(data.campCost) || 0,
      status: true,
      campCity: data.campCity || "",
      campState: data.campState || "",
      campVenue: data.campVenue || "",
      category: data.campTags?.[0] || "",
      campDescription: data.campDescription || "",
      campStart: data.campStart?.toDate().toLocaleDateString() || "",
      campEnd: data.campEnd?.toDate().toLocaleDateString() || "",
      campFormat: data.campFormat || "",
      campGenders: data.campGenders || "",
      campRegistrationURL: data.campRegistrationURL || "",
      campSeason: data.campSeason || "",
      campStreet: data.campStreet || "",
      campZip: data.campZip || "",
      campAgeMin: data.campAgeMin || "",
      campAgeMax: data.campAgeMax || "",
      date: data.campModified?.toDate().toLocaleDateString() || "",
      image,
      image2x,
    });
  });

  return released;
};


export const released = [];