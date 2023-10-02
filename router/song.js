const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const songController = require("../controllers/song");

router.post("/addSong", songController.addSong);

router.get("/getSongs", songController.getSongs);

module.exports = router;
