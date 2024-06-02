const Masina = require("./Masinas"); // Importē Masina modeli
const Lietotajs = require("./Lietotajs"); // Importē Lietotajs modeli

const mongoose = require("mongoose"); // Importē mongoose bibliotēku

// Definē rezervācijas shēmu, izmantojot mongoose.Schema
const reservationSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId, // Saite uz Masina dokumenta ID
    ref: "Masina", // Atsauce uz Masina modeli
    required: true, // Obligāts lauks
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Saite uz Lietotajs dokumenta ID
    ref: "Lietotajs", // Atsauce uz Lietotajs modeli
    required: true, // Obligāts lauks
  },
  intervals: {
    type: [Date], // Masīvs ar datumiem
    required: true, // Obligāts lauks
  },
  cena: {
    type: Number, // Cena rezervācijai
    required: true, // Obligāts lauks
  },
  izveidots: {
    type: Date, // Izveidošanas datums
    default: Date.now, // Noklusējuma vērtība ir pašreizējais datums
  },
});

// Eksportē mongoose modeli ar nosaukumu "Rezervacija" un reservationSchema shēmu
module.exports = mongoose.model("Rezervacija", reservationSchema);
