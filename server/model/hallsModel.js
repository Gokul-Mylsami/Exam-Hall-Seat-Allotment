const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  hallName: {
    type: String,
    required: [true, "you Must Provide a hall name"],
  },
});

const Halls = mongoose.model("Halls", hallSchema);

module.exports = Halls;
