// Script pour promouvoir un utilisateur en administrateur
// Usage: npm run set-admin <email>
// OU: npx tsx scripts/set-admin.ts <email>

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firebase/firebase";
import { setUserRole } from "../src/firebase/firestore";

async function setAdmin(email: string) {
  try {
    // Trouver l'utilisateur par email dans Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`Aucun utilisateur trouvé avec l'email: ${email}`);
      console.log("Assurez-vous que l'utilisateur s'est inscrit au moins une fois.");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const uid = userDoc.id;

    await setUserRole(uid, email, "admin");
    console.log(`✓ L'utilisateur ${email} a été promu administrateur avec succès!`);
  } catch (error) {
    console.error("Erreur lors de la promotion:", error);
  }
}

// Récupérer l'email depuis les arguments de la ligne de commande
const email = process.argv[2];

if (!email) {
  console.error("Usage: npm run set-admin <email>");
  console.error("OU: npx tsx scripts/set-admin.ts <email>");
  process.exit(1);
}

setAdmin(email);

