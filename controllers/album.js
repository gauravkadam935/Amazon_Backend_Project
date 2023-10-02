const Album = require("../modules/album");
const Song = require("../modules/song");
const getAlbum = async (req, res) => {
  const album = await Album.find({});
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }
  return res.json({
    status: "success",
    message: "album fetched successfully",
    data: album,
  });
};

const getAlbumById = async (req, res) => {
  const albumId = req.params.albumId;
  let song;
  let album;
  try {
    album = await Album.findById(albumId);
  } catch (error) {
    return res
      .status(404)
      .json({ status: "failure", message: "album not found" });
  }
  song = await Song.find({ album: albumId });
  return res.json({
    status: "success",
    message: "album fetched successfully",
    album: album,
    song: song,
  });
};
const createAlbum = async (req, res) => {
  const album = req.body;
  try {
    const newAlbum = new Album({ ...album });
    await newAlbum.save();
  } catch (error) {
    return res
      .status(404)
      .json({ status: "failure", message: "something went wrong" });
  }
  return res.json({
    status: "success",
    message: "album added successfully",
    data: album,
  });
};
module.exports = {
  getAlbum,
  getAlbumById,
  createAlbum,
};
