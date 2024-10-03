fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'KateG',
    email: 'kate@example.com',
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Сеть не отвечает');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Добавлен новый пользователь:', data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
