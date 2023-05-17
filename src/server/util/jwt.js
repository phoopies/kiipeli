const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
  const userForToken = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  return token;
};

const decodeJwtToken = (token) => {
  const user = jwt.verify(token, process.env.SECRET);
  return user;
};

module.exports = {
  createJwtToken, decodeJwtToken
}
