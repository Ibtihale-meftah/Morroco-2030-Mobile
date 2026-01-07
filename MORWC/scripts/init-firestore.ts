import { cities } from "../data/cities";
import { monuments } from "../data/monuments";
import { adminDb } from "../src/firebase/firebase-admin";

async function initFirestore() {
  console.log("Initialisation Firestore (ADMIN)...");

  // Cities
  for (const city of cities) {
    const { id, ...data } = city;
    await adminDb.collection("cities").doc(id).set(data);
    console.log("✓ City:", city.name);
  }

  // Monuments
  for (const monument of monuments) {
    const { id, ...data } = monument;
    await adminDb.collection("monuments").doc(id).set(data);
    console.log("✓ Monument:", monument.name);
  }

  console.log("DONE ✅");
  process.exit(0);
}

initFirestore();
