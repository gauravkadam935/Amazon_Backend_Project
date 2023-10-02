const express = require("express");
const app = express();

const router = express.Router();

const albumController = require("../controllers/album");

router.get("/getAlbum", albumController.getAlbum);

router.post("/createAlbum", albumController.createAlbum);

router.get("/getAlbum/:albumId", albumController.getAlbumById);

module.exports = router;
