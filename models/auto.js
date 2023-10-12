const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema({
  autoNumber: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 6,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Auto = mongoose.model("Auto", autoSchema);

module.exports = Auto;
