import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchUsers = async () => {
  const cachedUsers = Cookies.get("cachedUsers");
  if (cachedUsers) {
    return JSON.parse(cachedUsers);
  }

  const querySnapshot = await getDocs(collection(db, "users"));
  const userList = [];
  let idCounter = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userList.push({
      id: idCounter++,
      nameFirst: data.nameFirst || "",
      nameLast: data.nameLast || "",
      memberSince: data.memberSince?.toDate().toDateString() || "",
      avatar: data.avatar || "/images/content/Avatar-Default.png",
      email: data.email || "",
      userStatus: "Approved",
      userRole:
        data.userRole === "1"
          ? "Admin"
          : data.userRole === "2"
          ? "Provider"
          : "General User",
    });
  });

  Cookies.set("cachedUsers", JSON.stringify(userList), { expires: 1 / 24 });
  return userList;
};
