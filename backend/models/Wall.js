const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const WallSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: [3, "Name too short, min 3"],
      max: [24, "Name too long, max 24"],
    },
    // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      default: "",
      trim: true,
      max: [280, "Description too long"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: "fi" } }
);

/* eslint-disable */
WallSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

WallSchema.plugin(uniqueValidator);

const Wall = mongoose.model("Wall", WallSchema);

module.exports = Wall;
