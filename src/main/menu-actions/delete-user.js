import { db, auth } from '../../../firebase-config.js';
import {
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import {
  deleteUser as deleteAuthUser,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

export async function deleteUser(email, uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await deleteDoc(userDocRef);
    console.log('User removed from Firestore');

    const user = auth.currentUser;
    if (user && user.uid === uid) {
      await deleteAuthUser(user);
      console.log('User removed from Firebase Auth');
    }

    if (user && user.email === email) {
      await signOut(auth);
      console.log('User logged out');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
