const mongoose = require("mongoose"); // Importē mongoose bibliotēku

// Definē mašīnu shēmu, izmantojot mongoose.Schema
const masinasShema = new mongoose.Schema({
  Model: { type: String, required: true }, // Modelis ir obligāts
  Description: { type: String, required: true }, // Apraksts ir obligāts
  OneH: { type: Number, required: true }, // Cena par vienu stundu ir obligāta
  TwoH: { type: Number, required: true }, // Cena par divām stundām ir obligāta
  FiveH: { type: Number, required: true }, // Cena par piecām stundām ir obligāta
  OneD: { type: Number, required: true }, // Cena par vienu dienu ir obligāta
  Images: [{ data: Buffer, contentType: String }], // Attēlu masīvs, kur katram attēlam ir datu buferis un satura tips
  Status: {
    type: String,
    enum: ["Pieejams", "Rezervēts"], // Statuss var būt "Pieejams" vai "Rezervēts"
    default: "Pieejams", // Noklusējuma statuss ir "Pieejams"
  },
  Coordinates: { type: { lat: Number, lng: Number }, required: false }, // Koordinātas ar platumu (lat) un garumu (lng) nav obligātas
});

// Eksportē mongoose modeli ar nosaukumu "Masina" un masinasShema shēmu
module.exports = mongoose.model("Masina", masinasShema);
