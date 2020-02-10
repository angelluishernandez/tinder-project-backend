const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  liker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  liked: [String], 
  status: {
    type: Boolean
  }

}, {timestamps: true});


const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
