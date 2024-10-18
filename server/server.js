const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { ERRORS, OKMESSAGES, clientAnswerTypes } = require("./constants");
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
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
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
const { isTemplateValid } = require("./validate-template");

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
      return res.status(500).json({ error: ERRORS.serverError, info: err });
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

app.post("/upload-template", (req, res) => {
  const templateState = req.body;

  if (isTemplateValid(templateState)) {
    const { title, description, imageUrl, topicId, userId, questions } =
      templateState;
    const result = {
      title,
      description,
      image_url: imageUrl,
      topic_id: topicId,
      user_id: userId,
    };

    const formatQuestionsByType = (questions, type, mappedAnswerType) => {
      return questions
        .filter((question) => question.answerType === type)
        .map((question, index) => ({
          [`custom_${mappedAnswerType}${index + 1}_id`]: question.id,
          [`custom_${mappedAnswerType}${index + 1}_state`]: question.isRequired
            ? "PRESENT_REQUIRED"
            : "PRESENT_OPTIONAL",
          [`custom_${mappedAnswerType}${index + 1}_question`]: question.title,
          [`custom_${mappedAnswerType}${index + 1}_description`]:
            question.description,
          [`custom_${mappedAnswerType}${index + 1}_isShown`]: question.isShown,
        }))
        .reduce((acc, current) => ({ ...acc, ...current }), {});
    };

    // TODO make the same names and remove mapping
    const mappedAnswerTypes = {
      [clientAnswerTypes.oneLineString]: "string",
      [clientAnswerTypes.multilineString]: "text",
      [clientAnswerTypes.number]: "int",
      [clientAnswerTypes.checkbox]: "checkbox",
    };
    const formattedQuestions = {
      ...formatQuestionsByType(
        questions,
        clientAnswerTypes.oneLineString,
        mappedAnswerTypes[clientAnswerTypes.oneLineString],
      ),
      ...formatQuestionsByType(
        questions,
        clientAnswerTypes.multilineString,
        mappedAnswerTypes[clientAnswerTypes.multilineString],
      ),
      ...formatQuestionsByType(
        questions,
        clientAnswerTypes.number,
        mappedAnswerTypes[clientAnswerTypes.number],
      ),
      ...formatQuestionsByType(
        questions,
        clientAnswerTypes.checkbox,
        mappedAnswerTypes[clientAnswerTypes.checkbox],
      ),
    };

    result.questions = formattedQuestions;

    console.log(result);
    res.status(201).json({ message: "Ok", result });

    // const insertTemplateQuery =
    //   "INSERT INTO templates (title, description, imageUrl, topicId, userId) VALUES (?, ?, ?, ?, ?)";
    // const templateValues = [title, description, imageUrl, topicId, userId];

    // db.query(insertTemplateQuery, templateValues, (err, templateResult) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Ошибка сервера" });
    //   }

    //   const templateId = templateResult.insertId;

    //   const insertQuestionsQuery =
    //     "INSERT INTO questions (template_id, question_text, question_type, is_required) VALUES ?";

    //   const questionValues = questions.map((q) => [
    //     templateId,
    //     q.title,
    //     q.answerType,
    //     q.isRequired,
    //   ]);

    //   db.query(insertQuestionsQuery, [questionValues], (questionsErr) => {
    //     if (questionsErr) {
    //       return res
    //         .status(500)
    //         .json({ error: "Ошибка сервера при добавлении вопросов" });
    //     }

    //     res.status(201).json({ message: "Шаблон успешно создан" });
    //   });
    // });
  } else {
    return res.status(400).json({ error: "Неверные данные шаблона" });
  }
});

app.get("/me", (req, res) => {
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
        return res.status(404).json({ error: ERRORS.noUser });

      res.json(results[0]);
    });
  });
});

app.get("/topics", (_, res) => {
  const query = "SELECT * FROM topics";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: ERRORS.serverError });
    }
    res.json(results);
  });
});

app.post("/logout", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const query = "SELECT * FROM users WHERE token = ?";
  db.query(query, [token], (err, results) => {
    if (err) return res.status(500).json({ error: ERRORS.serverError });
    if (results.length === 0)
      return res.status(404).json({ error: ERRORS.noUser });

    const user = results[0];

    const updateQuery = "UPDATE users SET token = NULL WHERE id = ?";
    db.query(updateQuery, [user.id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: ERRORS.serverError });

      res.json({ message: "Logged out successfully" });
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
