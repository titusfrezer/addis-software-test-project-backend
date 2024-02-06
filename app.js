const express = require("express");
const mongoose = require("mongoose");
const app = express();
const songRoutes = require("./routes/songRoute");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello titus");
});
app.use("/songs", songRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose
  .connect("mongodb+srv://titus:ydenTlaH0I96pwuC@cluster0.embp1mk.mongodb.net/")
  .then((result) => console.log("I am connected"))
  .catch((err) => console.error(err));
