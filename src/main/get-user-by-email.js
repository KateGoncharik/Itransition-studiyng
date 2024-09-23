import {
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from '../../firebase-config.js';

export async function getUserByEmail(email) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No user with email ${email}`);
    }
    const userDoc = querySnapshot.docs[0];

    return {
      ...userDoc.data(),
      uid: userDoc.id,
    };
  } catch (error) {
    console.error('Error while getting user by email:', error);
  }
}
