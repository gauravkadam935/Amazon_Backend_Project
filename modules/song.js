const express = require("express");
const mongoose = require("mongoose");

const songSchema = {
  title: {
    type: String,
    required: true,
  },
  dateOfRelease: {
    type: Date,
    required: true,
  },
  artist: {
    type: [String],
    required: false,
    default: [],
  },
  mood: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
    default: [],
  },
  audio_url: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "albums",
    required: true,
  },
};

const Song = mongoose.model("songs", songSchema);
module.exports = Song;
