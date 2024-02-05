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

const editSong = async (req,res)=>{
  try{
    const result = await song.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.json(result);
  }catch(error){
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      res.status(400).json({ error: "Validation Error", errors });
    }
  }
}

const deleteSong = async (req,res)=>{
  try{
    const result = await song.findByIdAndDelete(req.params.id)
    res.json(result)
  }catch(error){
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      res.status(400).json({ error: "Validation Error", errors });
    }
  }
}
module.exports = { listOfSongs, addSong,editSong,deleteSong };
