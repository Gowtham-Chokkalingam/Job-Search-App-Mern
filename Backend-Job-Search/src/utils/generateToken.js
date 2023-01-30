const jwt = require("jsonwebtoken");

const generateToken = (id) => {

    // , name: user.name, email: user.email, isAdmin: user.isAdmin 
  return jwt.sign({ id}, process.env.JWT_SECRET, {
    expiresIn: "6 day",
  });
};

module.exports = generateToken;
