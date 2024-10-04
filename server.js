const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { ERRORS, OKMESSAGES } = require('./constants');

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
    console.error(ERRORS.dbConnection, err);
    return;
  }
  console.log(OKMESSAGES.dbConnection);
});

app.get('/users', (_, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.noUsers });
    }
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.serverError });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: ERRORS.noUser });
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
          error: ERRORS.duplicateEntry,
        });
      }
      return res.status(500).json({ error: ERRORS.serverError });
    }
    res.status(201).json({ id: results.insertId, username, email });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.serverError });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: ERRORS.noUser });
    }

    res.status(200).json({ message: OKMESSAGES.userDelete });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
