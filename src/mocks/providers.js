import { collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "../firebase";

export const fetchProviders = async () => {
  const cachedProviders = Cookies.get("cachedProviders");
  if (cachedProviders) {
    return JSON.parse(cachedProviders);
  }

  const providerList = [];

  const querySnapshot = await getDocs(collection(db, "providers"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    providerList.push({
      id: doc.id, // use Firestore doc ID here
      providerName: data.providerName || "",
      providerEmail: data.providerEmail || "",
      providerPhone: data.providerPhone || "",
      providerCity: data.providerCity || "",
      providerState: data.providerState || "",
      providerZip: data.providerZip || "",
      providerURL: data.providerURL || "",
      providerStatus: data.providerStatus || "",
    });
  });

  Cookies.set("cachedProviders", JSON.stringify(providerList), { expires: 1 / 24 });
  return providerList;
};