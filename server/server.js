const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { ERRORS, OKMESSAGES } = require("./constants");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const dbPort = process.env.DB_PORT;

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host,
  user,
  password,
  database,
  port: dbPort,
});

db.connect((err) => {
  if (err) {
    console.error(ERRORS.dbConnection, err);
    return;
  }
  console.log(OKMESSAGES.dbConnection);
});

app.get("/users", (_, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.noUsers });
    }
    res.json(results);
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.serverError });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: ERRORS.noUser });
    }
    res.json(results[0]);
  });
});

const bcrypt = require("bcryptjs");

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          error: ERRORS.duplicateEntry,
        });
      }
      return res.status(500).json({ error: ERRORS.serverError });
    }
    const token = jwt.sign({ userId: results.insertId }, secretKey, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Registered" });
  });
});

const secretKey = process.env.JWT_SECRET;

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: ERRORS.serverError });
    if (results.length === 0)
      return res.status(404).json({ error: ERRORS.noUser });

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" },
    );
    const updateQuery = "UPDATE users SET token = ? WHERE id = ?";
    db.query(updateQuery, [token, user.id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: ERRORS.serverError });

      res.json({ token });
    });
  });
});

app.get("/me", (req, res) => {
  // console.log(req);
  // if (!req.cookies) {
  //   return res.status(410).json({ error: "No cookies provided" });
  // }
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [decoded.id], (queryErr, results) => {
      if (queryErr) return res.status(500).json({ error: ERRORS.serverError });
      if (results.length === 0)
        return res.status(404).json({ error: "User not found" });

      res.json(results[0]);
    });
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";

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

const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running`);
});

app.get("/", (_, res) => {
  res.send("Server is running");
});
