fetch('http://localhost:3000/users')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Сеть не отвечает');
    }
    return response.json(); // Преобразуем ответ в JSON
  })
  .then((data) => {
    console.log('Список пользователей:', data); // Обрабатываем полученные данные
  })
  .catch((error) => {
    console.error('Ошибка:', error); // Обработка ошибок
  });
