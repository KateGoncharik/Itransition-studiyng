const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { ERRORS, OKMESSAGES, clientAnswerTypes } = require("./constants");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const clientOrigin = process.env.CLIENT_ORIGIN;

const dbPort = process.env.DB_PORT;

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const UPLOAD_DIR = path.join(__dirname, "uploads");

const upload = multer({ storage });

const clearUploadDir = () => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      console.error(ERRORS.readingDirectory, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(UPLOAD_DIR, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(ERRORS.fileDeleting, err);
        }
      });
    });
  });
};

app.use(cookieParser());

// TODO change for prod

const corsOptions = {
  origin: clientOrigin,
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
const { isTemplateValid } = require("./validate-template");
const { uploadImage } = require("./store-images");

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

    res.status(201).json({ message: OKMESSAGES.registered });
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
    // TODO make constants for development
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    const updateQuery = "UPDATE users SET token = ? WHERE id = ?";
    db.query(updateQuery, [token, user.id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: ERRORS.serverError });

      res.status(200).json("Logger in");
    });
  });
});

app.post("/upload-template", upload.single("image"), async (req, res) => {
  const templateState = req.body;
  if (!req.file) {
    return res.status(400).json({ error: ERRORS.noReceivedFile });
  }
  // why destination is uploads?
  // TODO check that folder exists - if not - create
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }
  const filePath = path.join(__dirname, req.file.path);
  console.log("File path:", filePath);
  const imgCloudUrl = await uploadImage(filePath);
  fs.unlinkSync(filePath);
  clearUploadDir();

  templateState.image = imgCloudUrl;
  if (isTemplateValid(templateState)) {
    const { title, description, topicId, userId } = templateState;

    const result = {
      title,
      description,
      image_url: imgCloudUrl,
      topic_id: topicId,
      user_id: userId,
    };
    const parsedQuestions = JSON.parse(templateState.questions);
    // TODO try catch?
    // TODO put strings in constants
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
    // TODO refactor
    const mappedAnswerTypes = {
      [clientAnswerTypes.oneLineString]: "string",
      [clientAnswerTypes.multilineString]: "text",
      [clientAnswerTypes.number]: "int",
      [clientAnswerTypes.checkbox]: "checkbox",
    };
    const formattedQuestions = {
      ...formatQuestionsByType(
        parsedQuestions,
        clientAnswerTypes.oneLineString,
        mappedAnswerTypes[clientAnswerTypes.oneLineString],
      ),
      ...formatQuestionsByType(
        parsedQuestions,
        clientAnswerTypes.multilineString,
        mappedAnswerTypes[clientAnswerTypes.multilineString],
      ),
      ...formatQuestionsByType(
        parsedQuestions,
        clientAnswerTypes.number,
        mappedAnswerTypes[clientAnswerTypes.number],
      ),
      ...formatQuestionsByType(
        parsedQuestions,
        clientAnswerTypes.checkbox,
        mappedAnswerTypes[clientAnswerTypes.checkbox],
      ),
    };

    Object.assign(result, formattedQuestions);

    const insertTemplateQuery = `
      INSERT INTO templates (
        title, description, image_url, topic_id, user_id,
        ${Object.keys(formattedQuestions).join(", ")}
      ) VALUES (?, ?, ?, ?, ?, ${Object.keys(formattedQuestions)
        .map(() => "?")
        .join(", ")})
    `;

    const templateValues = [
      result.title,
      result.description,
      result.image_url,
      result.topic_id,
      result.user_id,
      ...Object.values(formattedQuestions),
    ];

    db.query(insertTemplateQuery, templateValues, (err) => {
      if (err) {
        return res.status(500).json({ error: ERRORS.serverError });
      }
      res.status(201).json({ message: OKMESSAGES.templateCreated });
    });
  } else {
    return res.status(400).json({ error: ERRORS.invalidTemplate });
  }
});

app.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: ERRORS.noToken, info: req.cookies });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: ERRORS.invalidToken });
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

app.get("/auth/check", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ isAuthorized: false });
    }

    return res.status(200).json({ isAuthorized: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error occurred." });
  }
});

app.post("/logout", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: ERRORS.noToken });
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
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json({ message: OKMESSAGES.loggedOut });
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
  console.log(OKMESSAGES.serverIsRunning);
});

app.get("/", (_, res) => {
  res.send(OKMESSAGES.serverIsRunning);
});
