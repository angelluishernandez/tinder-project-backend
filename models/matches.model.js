const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  matcher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  matched: [String]
}, {timestamps: true});


const Matches = mongoose.model("Matches", matchSchema);

module.exports = Matches;
