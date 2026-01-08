import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function getCurrentUserRole() {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return null;

  return snap.data().role as "admin" | "user";
}

