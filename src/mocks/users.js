import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../src/firebase"; // adjust path if needed

const app = initializeApp(firebaseConfig); // ✅ Correct
const db = getFirestore(app);

export const fetchUsers = async () => {
  const cachedUsers = Cookies.get("cachedUsers");
  const cachedUsersTimestamp = Cookies.get("cachedUsersTimestamp");
  const now = Date.now();
  const expiration = 1 * 60 * 1000; // 1 minute

  if (cachedUsers && cachedUsersTimestamp && now - parseInt(cachedUsersTimestamp) < expiration) {
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
      memberSince: data.memberSince
        ? new Date(data.memberSince.toDate()).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })
        : "",
      avatar: data.avatar || "/images/content/Avatar-Default.png",
      email: data.email || "",
      userStatus: "Approved",
      userRole:
        data.role === "1"
          ? "Admin"
          : data.role === "2"
          ? "Provider"
          : "General User",
      role: ["1", "2", "3"].includes(data.role) ? data.role : "3",
    });
  });

  Cookies.set("cachedUsers", JSON.stringify(userList), { expires: 1 / 1440 });
  Cookies.set("cachedUsersTimestamp", now.toString(), { expires: 1 / 1440 });
  return userList;
};
