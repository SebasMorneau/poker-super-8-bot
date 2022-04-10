const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  position: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("Player", PlayerSchema);

module.exports = User;
