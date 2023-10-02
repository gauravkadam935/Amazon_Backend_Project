// const express = require("express");
const Song = require("../modules/song");
const Album = require("../modules/album");
const utilFunctions = require("../utils/utils");
// const mongoose = require("mongoose");

const addSong = async (req, res) => {
  const song = req.body;
  let newSong;
  try {
    let isAlbum = await Album.findById(song.album);
    if (isAlbum) {
      newSong = new Song({ ...song });
      await newSong.save();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: "fail", message: "Somthing is wrong" });
  }

  return res.json({
    status: "success",
    message: "song added successfully",
    data: newSong,
  });
};

const getSongs = async (req, res) => {
  const query = utilFunctions.getSongQuerySearch(req.query);
  let songs;
  try {
    songs = await Song.find(query);
  } catch (error) {
    return res.status(404).json({ status: "fail", message: "song not found" });
  }
  if (songs.lenght == 0)
    return res.json({ status: "fail", message: "song not found" });
  return res.json({
    status: "success",
    message: "song fetched successfully",
    data: songs,
  });
};
module.exports = {
  addSong,
  getSongs,
};
