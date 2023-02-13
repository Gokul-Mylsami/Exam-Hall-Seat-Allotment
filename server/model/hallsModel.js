const mongoose = require("mongoose");
// const hall

const hallSchema = new mongoose.Schema({
  department: {
    type: String,
    required: [true, "you Must Provide a department"],
  },
  noOfHalls: {
    type: Number,
    default: 0,
    min: [0, "no of halls must be a positive number"],
  },
  noOfCC: {
    type: Number,
    default: 0,
    min: [0, "no of CC must be a positive number"],
  },
  halls: {},
});

const Halls = mongoose.model("Halls", hallSchema);

module.exports = Halls;
