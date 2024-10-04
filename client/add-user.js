fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'KateGu',
    email: 'kate@example2.com',
  }),
})
  .then((response) => {
    if (response.status === 400) {
      throw new Error('User with this credentials already exists');
    }
    if (!response.ok) {
      throw new Error('Some error ocurred');
    }
    return response.json();
  })
  .then((data) => {
    console.log('New user registered:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
