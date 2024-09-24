import {
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import {
  deleteUser as deleteAuthUser,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { db, auth } from '../../../../firebase-config.js';

export async function deleteUser(userEmail) {
  try {
    const userDocRef = doc(db, 'users', userEmail);
    await deleteDoc(userDocRef);

    const currentUser = auth.currentUser;

    if (currentUser && currentUser.email === userEmail) {
      await deleteAuthUser(currentUser);
      await signOut(auth);
    }
  } catch (error) {
    console.error('Error while deleting user:', error);
  }
}
