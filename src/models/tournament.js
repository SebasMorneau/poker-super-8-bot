const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
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

const User = mongoose.model("Tournament", TournamentSchema);

module.exports = User;
