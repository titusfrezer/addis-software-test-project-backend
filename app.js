const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const songRoutes = require("./routes/songRoute");
const port = process.env.PORT || 3000;
const userName =  process.env.DB_USER;
const password = process.env.DB_PASS;
app.use(express.json());

app.use("/songs", songRoutes);  
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});

mongoose
  .connect(`mongodb+srv://${userName}:${password}@cluster0.embp1mk.mongodb.net/`)
  .then((result) => console.log("I am connected"))
  .catch((err) => console.error(err));
