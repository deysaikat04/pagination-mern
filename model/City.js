const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  loc: [Number],
  pop: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

module.exports = Cities = mongoose.model("cities", CitySchema);
