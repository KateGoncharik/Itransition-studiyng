const ERRORS = {
  dbConnection: "Error while connecting to database",
  noUsers: "Error fetching users",
  noUser: "User not found",
  noTemplates: "Error fetching templates",
  duplicateEntry: "Duplicate entry",
  serverError: "Internal server error",
  fileDeleting: "File deletion failed",
  readingDirectory: "Error reading upload directory:",
  noReceivedFile: "File was not received",
  invalidTemplate: "Invalid template data",
  noToken: "No token provided",
  invalidToken: "Invalid token",
};

const OKMESSAGES = {
  dbConnection: "Successfully connected to database",
  userDelete: "Successfully deleted user",
  templateCreated: "Successfully created template",
  registered: "Successfully registered",
  loggedOut: "Successfully logged out",
  serverIsRunning: "Server is running",
};

const clientAnswerTypes = {
  oneLineString: "one-line-string",
  multilineString: "multiline-string",
  number: "number",
  checkbox: "checkbox",
};

module.exports = { ERRORS, OKMESSAGES, clientAnswerTypes };
