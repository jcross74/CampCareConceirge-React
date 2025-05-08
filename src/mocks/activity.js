import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchActivity = async () => {
  const cachedActivity = Cookies.get("cachedActivity");
  if (cachedActivity) {
    return JSON.parse(cachedActivity);
  }

  const querySnapshot = await getDocs(collection(db, "activity"));
  const activityList = [];
  let idCounter = 0;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      activityList.push({
        id: idCounter++,
        activityName: data.activityName || "",
      });
    });
  
    Cookies.set("cachedActivity", JSON.stringify(activityList), { expires: 1 / 24 });
    return activityList;
  };
  