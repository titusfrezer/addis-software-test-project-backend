const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: {
    type: String,
    required: true,
    enum: ["Pop", "Rock", "Jazz", "Hip-Hop", "Regae","Other"], // Restrict genre to a predefined set
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
