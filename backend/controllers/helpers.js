const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// https://eslint.org/docs/rules/no-param-reassign
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 *
 * @param {*} documentToUpdate The mongoose document we wish to update
 * @param {*} values Object containing the [key, value]-pairs we wish to try to update
 */
const updateDocumentValues = (documentToUpdate, values) => {
  Object.entries(values).forEach(([key, value]) => {
    if (value) documentToUpdate[key] = value;
  });
};

const getUserFromToken = (token) => {
  if (!token) return null;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  return decodedToken;
};

const getImage = (dataPath) => {
  return {
    data: fs.readFileSync(path.join(__dirname, "..", dataPath)),
    contentType: "image/png",
  };
};

module.exports = { updateDocumentValues, getUserFromToken, getImage };
