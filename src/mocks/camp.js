import { getDocs, collection, query, where, orderBy, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase"; 
import { progress } from "../utils";
import Cookies from "js-cookie";

export const fetchCampData = async () => {
  const cached = Cookies.get("campData");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Invalid cache, refetching data.");
    }
  }

  const snapshot = await getDocs(query(collection(db, "camps"), orderBy("campModified", "desc")));
  const camp = [];

  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const image = data.campImage?.[0] || "/images/content/Camp_Image.png";
    const image2x = data.campImage?.[0] || "/images/content/Camp_Image@2x.png";

    camp.push({
      id: index,
      docID: doc.id,
      campName: data.campName || "",
      campHost: data.campProvider || "",
      campCost: Number(data.campCost) || 0,
      status: data.campStatus === "Approved" ? true : false,
      campCity: data.campCity || "",
      campState: data.campState || "",
      campVenue: data.campVenue || "",
      category: data.campTags?.[0] || "",
      campModified: data.campModified?.toDate().toLocaleDateString() || "",
      image,
      image2x,
    });
  });

  Cookies.set("campData", JSON.stringify(camp), { expires: 1 / 1440 }); // 1 minute
  return camp;
};

export const fetchReleasedData = async () => {
  const snapshot = await getDocs(
    query(collection(db, "camps"), where("campStatus", "==", "Approved"), orderBy("campModified", "desc"))
  );
  const released = [];

  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const image = data.campImage?.[0] || "/images/content/Camp_Image.png";
    const image2x = data.campImage?.[0] || "/images/content/Camp_Image@2x.png";

    released.push({
      id: index,
      docID: doc.id,
      campName: data.campName || "",
      campHost: data.campProvider || "",
      campCost: Number(data.campCost) || 0,
      status: data.campStatus === "Approved" ? true : false,
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
      campModified: data.campModified?.toDate().toLocaleDateString() || "",
      image,
      image2x,
    });
  });

  return released;
};


export const released = [];

/**
 * Get total number of camps without downloading all documents
 */
export const fetchCampCount = async () => {
  const coll = collection(db, "camps");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

/**
 * Get number of approved camps without downloading all documents
 */
export const fetchApprovedCampCount = async () => {
  const approvedQuery = query(
    collection(db, "camps"),
    where("campStatus", "==", "Approved")
  );
  const snapshot = await getCountFromServer(approvedQuery);
  return snapshot.data().count;
};