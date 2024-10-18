const ERRORS = {
  dbConnection: "Error while connecting to database",
  noUsers: "Error fetching users",
  noUser: "User not found",
  duplicateEntry: "Duplicate entry",
  serverError: "Internal server error",
};

const OKMESSAGES = {
  dbConnection: "Successfully connected to database",
  userDelete: "Successfully deleted user",
  templateCreated: "Template created",
};

const clientAnswerTypes = {
  oneLineString: "one-line-string",
  multilineString: "multiline-string",
  number: "number",
  checkbox: "checkbox",
};

module.exports = { ERRORS, OKMESSAGES, clientAnswerTypes };
