fetch('http://localhost:3000/users/2', {
  method: 'DELETE',
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Ответ сервера:', data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });