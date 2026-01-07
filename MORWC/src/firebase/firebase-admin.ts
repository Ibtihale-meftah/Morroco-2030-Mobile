import admin from "firebase-admin";
const serviceAccount = require("../../scripts/morocco-2030-mobile-firebase-adminsdk.json") as admin.ServiceAccount;
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const adminDb = admin.firestore();

