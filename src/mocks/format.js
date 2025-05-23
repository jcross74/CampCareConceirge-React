import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchFormats = async () => {
  const cachedFormat = Cookies.get("cachedFormat");
  if (cachedFormat) {
    return JSON.parse(cachedFormat);
  }

  const querySnapshot = await getDocs(collection(db, "format"));
  const formatList = [];
  let idCounter = 0;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      formatList.push({
        id: idCounter++,
        formatName: data.formatName || "",
      });
    });
  
    formatList.sort((a, b) => a.formatName.localeCompare(b.formatName));
    Cookies.set("cachedFormat", JSON.stringify(formatList), { expires: 1 / 24 });
    return formatList;
  };