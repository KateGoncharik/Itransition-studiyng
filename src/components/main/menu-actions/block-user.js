import {
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { db, auth } from '../../../../firebase-config.js';

export const blockUser = async (email, userId) => {
  const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, {
    status: 'blocked',
  })
    .then(async () => {
      const user = auth.currentUser;
      if (user && user.email === email) {
        await signOut(auth);
      }
    })
    .catch((error) => {
      console.error('Error while blocking user: ', error);
    });
};
