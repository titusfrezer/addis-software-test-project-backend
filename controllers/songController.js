const song = require("../models/song");

const listOfSongs = async (req, res) => {
  let songs = await song.find();

  res.json(songs);
};

const addSong = async (req, res) => {
  try {
    const result = await song.create(req.body);
    res.json(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      res.status(400).json({ error: "Validation Error", errors });
    }
  }
};

const editSong = async (req, res) => {
  try {
    const result = await song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      res.status(400).json({ error: "Validation Error", errors });
    }
  }
};

const deleteSong = async (req, res) => {
  try {
    const result = await song.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      res.status(400).json({ error: "Validation Error", errors });
    }
  }
};

const totalNumberOfSongs = async (req, res) => {
  try {
    const totalSongs = await song.countDocuments();
    const genreCounts = await song.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
    ]);
    const albumCounts = await song.aggregate([
      {
        $match: {
          album: { $exists: true, $ne: null }, // Filter out null or undefined values in the genre field
        },
      },
      {
        $group: {
          _id: "$album",
          count: { $sum: 1 },
        },
      },
    ]);
    const artistCounts = await song.aggregate([
      {
        $group: {
          _id: "$artist",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json({ totalSongs, genreCounts, albumCounts,artistCounts });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = {
  listOfSongs,
  addSong,
  editSong,
  deleteSong,
  totalNumberOfSongs,
};
