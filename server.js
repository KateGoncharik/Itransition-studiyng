const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kate',
  password: 'PanteraMambo2024',
  database: 'my_forms_database',
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных установлено');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении данных' });
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { username, email } = req.body;

  const query = 'INSERT INTO users (username, email) VALUES (?, ?)';

  db.query(query, [username, email], (err, results) => {
    if (err) {
      console.error('Ошибка при добавлении пользователя:', err);
      return res
        .status(500)
        .json({ error: 'Ошибка при добавлении пользователя' });
    }
    res.status(201).json({ id: results.insertId, username, email });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
