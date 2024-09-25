import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { db } from "../../../firebase-config.js";
import { formatEmail } from "../auth/format-email.js";

export const getUserByEmail = async (email) => {
  const formattedEmail = formatEmail(email);
  try {
    const userDocRef = doc(db, "users", formattedEmail);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error(`No user with email ${email}`);
    }

    return {
      ...userDoc.data(),
      uid: userDoc.id,
    };
  } catch (error) {
    console.error("Error while getting user by email:", error);
  }
};
