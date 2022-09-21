const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Also has id
const HoldSchema = mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

/* eslint-disable */
HoldSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const WallHoldsSchema = mongoose.Schema(
  {
    wallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wall",
      required: true,
      unique: true,
    },
    // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
    holds: {
      type: [HoldSchema],
      required: true,
      default: [],
    },
  },
  { collation: { locale: "fi" } }
);

/* eslint-disable */
WallHoldsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

WallHoldsSchema.plugin(uniqueValidator);

const WallHolds = mongoose.model("WallHolds", WallHoldsSchema);

module.exports = WallHolds;
