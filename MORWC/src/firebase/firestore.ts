import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Types
export interface City {
  id: string;
  name: string;
  description: string;
  history: string;
  specialties: string[];
  climate: string;
  languages: string[];
  tips: string[];
  isHostCity: boolean;
  image?: string;
}

export interface Monument {
  id: string;
  name: string;
  cityId: string;
  description: string;
  hours: string;
  price: string;
  location: string;
  photos: string[];
}

export interface UserRole {
  uid: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}

// Villes
export const citiesCollection = collection(db, "cities");

export async function getCities(): Promise<City[]> {
  const snapshot = await getDocs(citiesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as City));
}

export async function getCity(id: string): Promise<City | null> {
  const docRef = doc(db, "cities", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as City;
  }
  return null;
}

export async function addCity(city: Omit<City, "id">): Promise<string> {
  const docRef = await addDoc(citiesCollection, city);
  return docRef.id;
}

export async function updateCity(id: string, city: Partial<City>): Promise<void> {
  const docRef = doc(db, "cities", id);
  await updateDoc(docRef, city);
}

export async function deleteCity(id: string): Promise<void> {
  const docRef = doc(db, "cities", id);
  await deleteDoc(docRef);
}

// Monuments
export const monumentsCollection = collection(db, "monuments");

export async function getMonuments(): Promise<Monument[]> {
  const snapshot = await getDocs(monumentsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Monument));
}

export async function getMonument(id: string): Promise<Monument | null> {
  const docRef = doc(db, "monuments", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Monument;
  }
  return null;
}

export async function getMonumentsByCity(cityId: string): Promise<Monument[]> {
  const snapshot = await getDocs(monumentsCollection);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Monument))
    .filter((monument) => monument.cityId === cityId);
}

export async function addMonument(
  monument: Omit<Monument, "id">
): Promise<string> {
  const docRef = await addDoc(monumentsCollection, monument);
  return docRef.id;
}

export async function updateMonument(
  id: string,
  monument: Partial<Monument>
): Promise<void> {
  const docRef = doc(db, "monuments", id);
  await updateDoc(docRef, monument);
}

export async function deleteMonument(id: string): Promise<void> {
  const docRef = doc(db, "monuments", id);
  await deleteDoc(docRef);
}

// Rôles utilisateurs
export const usersCollection = collection(db, "users");

export async function getUserRole(uid: string): Promise<UserRole | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      uid: docSnap.id,
      email: data.email,
      role: data.role || "user",
      createdAt: data.createdAt?.toDate() || new Date(),
    } as UserRole;
  }
  return null;
}

export async function setUserRole(
  uid: string,
  email: string,
  role: "user" | "admin" = "user"
): Promise<void> {
  const docRef = doc(db, "users", uid);
  const userDoc = await getDoc(docRef);
  
  if (userDoc.exists()) {
    await updateDoc(docRef, {
      email,
      role,
      updatedAt: new Date(),
    });
  } else {
    await setDoc(docRef, {
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export async function isAdmin(uid: string): Promise<boolean> {
  const userRole = await getUserRole(uid);
  return userRole?.role === "admin";
}

// Helper pour obtenir le rôle de l'utilisateur actuel
export async function getCurrentUserRole(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return null;

  return snap.data().role || null;
}

