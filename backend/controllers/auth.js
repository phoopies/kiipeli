const authRouter = require("express").Router();

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const verifyPassword = async (password, passwordHash) => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};

/*
  /REGISTER
  /LOGIN

*/

authRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "invalid credentials" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    username: username,
    passwordHash,
  });

  const createdUser = await user.save();
  if (!createdUser)
    return res.status(400).json({ error: "couldnt register user" });

  return res.status(201).json(createdUser);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "invalid credentials" });

  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash)))
    return res.status(401).json({ error: "invalid email or password" });

  const userForToken = {
    id: user._id,
    email,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  const jsonUser = user.toJSON();

  // Palauttaa nyt { user, token }
  return res.status(200).json({
    ...jsonUser,
    token,
  });
});

module.exports = authRouter;
