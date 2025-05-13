import { getDocs, collection, query, where, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

// Pending Camps & Activities

export const fetchPendingProducts = async () => {
  const snapshot = await getDocs(
    query(collection(db, "camps"), where("campStatus", "==", "Pending"))
  );
  const products = [];

  if (snapshot.empty) {
    console.warn("No pending camps found.");
  }

  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const image = data.campImage?.[0] || "/images/content/Camp_Image.png";
    const image2x = data.campImage?.[0] || "/images/content/Camp_Image@2x.png";

    products.push({
      id: index,
      campID: doc.id,
      campName: data.campName || "",
      campHost: data.campProvider || "",
      campCity: data.campCity || "",
      campState: data.campState || "",
      campDescription: data.campDescription || "",
      campStart: data.campStart?.toDate().toLocaleDateString() || "",
      campEnd: data.campEnd?.toDate().toLocaleDateString() || "",
      campFormat: data.campFormat || "",
      campGenders: data.campGenders || "",
      campRegistrationURL: data.campRegistrationURL || "",
      campSeason: data.campSeason || "",
      campStreet: data.campStreet || "",
      campZip: data.campZip || "",
      campVenue: data.campVenue || "",
      campAgeMin: data.campAgeMin || "",
      campAgeMax: data.campAgeMax || "",
      price: Number(data.campCost) || 0,
      status: data.campStatus === "Pending",
      image,
      image2x,
      date: data.campModified?.toDate().toLocaleDateString() || "",
    });
  });

  return products;
};

export const products = [];