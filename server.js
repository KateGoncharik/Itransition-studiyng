const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const errors = {
  dbConnection: 'Error while connecting to database',
  noUsers: 'Error fetching users',
  noUser: 'Error fetching user by ID',
  userNotFound: 'User not found',
  duplicateEntry: 'Duplicate entry',
  serverError: 'Internal server error',
};

const okMessages = {
  dbConnection: 'Successfully connected to database',
  userDelete: 'Successfully deleted user',
};

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kate',
  password: 'PanteraMambo2024',
  database: 'my_forms_database',
});

db.connect((err) => {
  if (err) {
    console.error(errors.dbConnection, err);
    return;
  }
  console.log(okMessages.dbConnection);
});

app.get('/users', (_, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: errors.noUsers });
    }
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: errors.serverError });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: errors.noUser });
    }
    res.json(results[0]);
  });
});

app.post('/users', (req, res) => {
  const { username, email } = req.body;

  const query = 'INSERT INTO users (username, email) VALUES (?, ?)';

  db.query(query, [username, email], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          error: errors.duplicateEntry,
        });
      }
      return res.status(500).json({ error: errors.serverError });
    }
    res.status(201).json({ id: results.insertId, username, email });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: errors.serverError });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: errors.noUser });
    }

    res.status(200).json({ message: okMessages.userDelete });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
