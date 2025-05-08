import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchSeason = async () => {
  const cachedSeason = Cookies.get("cachedSeason");
  if (cachedSeason) {
    return JSON.parse(cachedSeason);
  }

  const querySnapshot = await getDocs(collection(db, "season"));
  const seasonList = [];
  let idCounter = 0;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      seasonList.push({
        id: idCounter++,
        seasonName: data.seasonName || "",
      });
    });
  
    Cookies.set("cachedSeason", JSON.stringify(seasonList), { expires: 1 / 24 });
    return seasonList;
  };
  