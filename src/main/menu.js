import { Component } from '../../component.js';
import {
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

export const createMenu = () => {
  const deleteButton = new Component({ tag: 'button', text: 'Удалить' });
  deleteButton.addListener('click', () => console.log('TODO'));

  return new Component({ className: 'menu container-fluid' }, deleteButton);
};

export const deleteUser = (userId) => {
  const userDoc = doc(db, 'users', userId);
  deleteDoc(userDoc)
    .then(() => {
      console.log('User deleted successfully');
    })
    .catch((error) => {
      console.error('Error while deleting user: ', error);
    });
};
