const mongoose = require("mongoose"); // Importē mongoose bibliotēku
const bcrypt = require("bcrypt"); // Importē bcrypt bibliotēku, ko izmanto paroļu šifrēšanai

// Definē lietotāju shēmu, izmantojot mongoose.Schema
const lietotajuShema = new mongoose.Schema({
  lietotajvards: { type: String, required: true, unique: true }, // Lietotājvārds ir obligāts un unikāls
  parole: { type: String, required: true }, // Parole ir obligāta
  loma: {
    type: String,
    enum: ["lietotajs", "admin"], // Loma var būt vai nu "lietotajs" vai "admin"
    default: "lietotajs", // Noklusējuma loma ir "lietotajs"
  },
  statuss: {
    type: String,
    enum: ["Verificēts", "Neverificēts", "Atteikts"], // Statuss var būt "Verificēts", "Neverificēts" vai "Atteikts"
    default: "Neverificēts", // Noklusējuma statuss ir "Neverificēts"
  },
  license: {
    data: Buffer, // Licence datu glabāšanai
    contentType: String, // Licence datu tipam
  },
  izveidots: { type: Date, default: Date.now }, // Izveidošanas datums ar noklusējuma vērtību - pašreizējo datumu
});

// Pievieno pre-save  funkciju shēmai, lai šifrētu paroli pirms saglabāšanas
lietotajuShema.pre("save", async function (next) {
  try {
    if (!this.isModified("parole")) { // Ja parole nav mainīta, pāriet uz nākamo middleware
      return next();
    }
    const salt = await bcrypt.genSalt(10); // Ģenerē sāli ar 10 kārtu sarežģītību
    this.parole = await bcrypt.hash(this.parole, salt); // Šifrē paroli ar ģenerēto sāli
    next(); // Turpina ar nākamo middleware
  } catch (err) {
    return next(err); // Ja ir kļūda, nodod to nākamajam middleware
  }
});

// Eksportē mongoose modeli ar nosaukumu "Lietotajs" un lietotajuShema shēmu
module.exports = mongoose.model("Lietotajs", lietotajuShema);
