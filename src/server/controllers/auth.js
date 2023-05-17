const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const logger = require('../util/logger');
const jwt = require('../util/jwt');

const verifyPassword = async (password, passwordHash) => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};


/*
  /REGISTER
  /LOGIN
*/

authRouter.post('/register', async (req, res) => {
  const { password, username } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing credentials' });
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, passwordHash });
    const token = jwt.createJwtToken(user);
    return res.status(201).json({ user: user.toJSON(), token });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing credentials' });

  const user = await User.findOne({ username });
  if (!user || !(await verifyPassword(password, user.passwordHash)))
    return res.status(401).json({ error: 'invalid username or password' });

  const token = jwt.createJwtToken(user);
  const jsonUser = user.toJSON();

  return res.status(200).json({
    user: jsonUser,
    token,
  });
});

authRouter.get('/me', async (req, res) => {
  const token = req.token;
  if (!token) {
    return res.status(404).json({ error: 'Missing token' });
  }
  const tokenUser = jwt.decodeJwtToken(token);
  const user = await User.findById(tokenUser.id);
  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }
  return res.status(200).json(user.toJSON());
});

module.exports = authRouter;
