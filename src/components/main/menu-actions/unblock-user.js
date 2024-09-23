import {
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from '../../../../firebase-config.js';

export const unblockUser = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, {
    status: 'active',
  }).catch((error) => {
    console.error('Error while unblocking user: ', error);
  });
};
