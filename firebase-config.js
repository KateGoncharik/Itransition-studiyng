import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const config = {
  apiKey: 'AIzaSyCyARYEMyp-_ifU3rJ9rrdM2rFQebHI8e8',
  authDomain: 'managinguserstask.firebaseapp.com',
  projectId: 'managinguserstask',
  storageBucket: 'managinguserstask.appspot.com',
  messagingSenderId: '258101266080',
  appId: '1:258101266080:web:0d06826476a7b094a2abc5',
  measurementId: 'G-GE796WMZT2',
};
initializeApp(config);

export const auth = getAuth();
export const db = getFirestore();
