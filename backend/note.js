const mongoose = require("mongoose");

const models\Note.jsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("models\Note.js", models\Note.jsSchema);
