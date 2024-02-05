const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/",songController.listOfSongs);

router.post("/",songController.addSong);

router.put("/:id",songController.editSong);

router.delete("/:id",songController.deleteSong);
module.exports = router;
