import { getUrl } from './get-url.js';

fetch(getUrl('users'))
  .then((response) => {
    if (!response.ok) {
      throw new Error('Сеть не отвечает');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Список пользователей:', data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
