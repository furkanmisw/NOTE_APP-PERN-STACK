const router = require("express").Router();
const db = require("../db/pool");
const { LOGIN, IS_EXIST_USERNAME, SIGNUP } = require("../db/strings");
const { asyncErrorWrapper, createError } = require("../mw/error");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });

const login = asyncErrorWrapper(async (req, res) => {
  const { username, password } = req.body;
  const user = await db.query(LOGIN, [username, password]);
  if (user.rows.length === 0) createError("Invalid username or password");
  const token = generateToken(user.rows[0].id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
  });
  res.cookie("isloggedin", true, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.status(200).json({ message: "Login successful" });
});

const signup = asyncErrorWrapper(async (req, res) => {
  const { username, password } = req.body;

  const usernameExist = await db.query(IS_EXIST_USERNAME, [username]);
  if (usernameExist.rows[0].count !== "0")
    createError("Username already exist");
  const user = await db.query(SIGNUP, [username, password]);
  const token = generateToken(user.rows[0].id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
  });
  res.cookie("isloggedin", true, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.status(201).json({ message: "Signup successful" });
});
const logout = asyncErrorWrapper(async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("isloggedin");
  res.status(401).json({ message: "Logged out" });
});
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);

module.exports = router;
