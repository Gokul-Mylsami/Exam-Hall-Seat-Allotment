const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  department: {
    type: String,
    required: [true, "you Must Provide a department"],
  },
  noOfHalls: 
});

const Halls = mongoose.model("Halls", hallSchema);

module.exports = Halls;
