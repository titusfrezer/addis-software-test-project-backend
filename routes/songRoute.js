const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/",songController.listOfSongs);

router.post("/",songController.addSong);

router.put("/:id",songController.editSong);

router.delete("/:id",songController.deleteSong);

router.get("/stats",songController.totalNumberOfSongs);
module.exports = router;
