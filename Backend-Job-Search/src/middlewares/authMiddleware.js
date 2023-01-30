const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token.startsWith(`"`)) {
        token = token.split(`"`)[1];
      }
   
      const decoded = jwt.verify(token, JWT_SECRET);

      //> this req.user will use full to fetch the realted data to the particular user

      const findUser = await User.findById(decoded.userId).select("-password");
      req.userId = findUser._id;

      next();
    } catch (error) { 
      res.status(401).send("Not authorized, token failed");
 
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, token Empty");
    throw new Error("Not authorized, token Empty");
  } 
};

module.exports = { protect };
  