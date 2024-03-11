const jwt = require("jsonwebtoken");

const genToken = function (id, role, name) {
  if (Boolean(id && role && name)) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id, role, name }, JWT_SECRET, {});
    if (token) return "bearer " + token;
  }
  return null;
};

module.exports = { genToken };
