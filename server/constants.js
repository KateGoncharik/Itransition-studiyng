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
};

module.exports = { ERRORS, OKMESSAGES };
