const express = require("express");
const { userSignup, userSigin } = require("../controllers/userController");

const router = express.Router();
//> User Route
router.post("/register", userSignup);
router.post("/login", userSigin);
module.exports = router;
