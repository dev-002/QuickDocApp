const jwt = require("jsonwebtoken");

const genToken = function (id, role, fullName) {
  if (Boolean(id && role && fullName)) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id, role, fullName }, JWT_SECRET, {
      expiresIn: "12h",
    });
    if (token) return "bearer " + token;
  }
  return null;
};

module.exports = { genToken };
