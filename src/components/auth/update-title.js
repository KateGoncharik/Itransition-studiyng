import { auth } from '../../../firebase-config.js';
import { getUserByEmail } from '../main/get-user-by-email.js';

export async function updateTitle() {
  const title = document.querySelector('.main-title');
  const userInAuth = auth.currentUser;
  const userInDB = await getUserByEmail(userInAuth.email);
  title.innerHTML = `Hello, ${userInDB.id}!`;
}
export function hideTitle() {
  console.log('AAA');
  const title = document.querySelector('.main-title');
  title.innerHTML = '';
}
