import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchTags = async () => {
  const cachedTags = Cookies.get("cachedTags");
  if (cachedTags) {
    return JSON.parse(cachedTags);
  }

  const tagsQuery = query(collection(db, "tags"), orderBy("tagName"));
  const querySnapshot = await getDocs(tagsQuery);
  const tagsList = [];
  let idCounter = 0;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tagsList.push({
        id: idCounter++,
        tagName: data.tagName || "",
      });
    });

    Cookies.set("cachedTags", JSON.stringify(tagsList), { expires: 1 / 24 });
    return tagsList;
  };
  