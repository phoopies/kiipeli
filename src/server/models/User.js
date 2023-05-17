const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('../util/validators');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      min: [3, 'liian lyhyt käyttäjänimi'],
      max: [16, 'liian pitkä käyttäjänimi'],
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
      validate: {
        validator: validators.validateUsername,
        message: 'virheellinen käyttäjänimi',
      },
    },
    passwordHash: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ['fi', 'en'],
      default: 'fi',
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

/* eslint-disable */
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
