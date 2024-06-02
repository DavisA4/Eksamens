const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const lietotajuRoute = require('./routes/lietotaji');
const masinasRoute = require('./routes/masinas')
const rezervacijasRoute = require('./routes/rezervacijas');
const cors = require("cors");
require("dotenv").config();

const parole = encodeURIComponent(process.env.uripass);

const uri = `mongodb+srv://davisbarons2015:${parole}@eksamens.iwalabq.mongodb.net/?retryWrites=true&w=majority&appName=eksamens`

const app = express();

app.use(cors());

app.use(bodyParser.json());

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected");
    } catch (error) {
      console.error(error);
    }
  }
  
  connect();

app.use('/api/lietotaji', lietotajuRoute);
app.use('/api/masinas', masinasRoute);
app.use('/api/rezervacijas', rezervacijasRoute);

const PORT = process.env.portserver;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
