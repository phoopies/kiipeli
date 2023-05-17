const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const HoldSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const RouteSchema = mongoose.Schema(
  {
    wallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wall',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      default: 'Unnamed',
      min: [2, 'Name too short, min 2'],
      max: [32, 'Name too long, max 32'],
    },
    grade: {
      type: String,
      trim: true,
      required: true,
      min: [2, 'Create a real grade'],
      max: [3, 'Create a real grade'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      max: [280, 'Description too long'],
    },
    holds: {
      type: [HoldSchema],
      required: true,
    },
  },
  { collation: { locale: 'fi' } }
);

/* eslint-disable */
RouteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

RouteSchema.plugin(uniqueValidator);

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
