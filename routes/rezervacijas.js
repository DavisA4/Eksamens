const express = require("express"); // Importē express bibliotēku
const router = express.Router(); // Izveido express maršrutētāju
const Rezervacija = require("../models/Rezervacija"); // Importē Rezervacija modeli
const Masina = require("../models/Masinas"); // Importē Masina modeli

// GET maršruts, lai iegūtu visas rezervācijas
router.get("/", async (req, res) => {
  try {
    // Iegūst visas rezervācijas no datubāzes
    const reservations = await Rezervacija.find();
    res.json(reservations);
  } catch (error) {
    // Apstrādā kļūdas
    res.status(500).json({ message: error.message });
  }
});

// POST maršruts, lai pievienotu jaunu rezervāciju
router.post("/add-rezervacija", async (req, res) => {
  try {
    const { carId, userId, intervals, cena } = req.body;

    // Izveido jaunu rezervācijas instanci
    const newReservation = new Rezervacija({
      carId,
      userId,
      intervals,
      cena,
    });

    // Saglabā jauno rezervāciju datubāzē
    const savedReservation = await newReservation.save();

    // Atjaunina automašīnas statusu uz "Rezervēts"
    await Masina.findByIdAndUpdate(carId, { Status: "Rezervēts" });

    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE maršruts, lai dzēstu rezervāciju pēc lietotāja ID
router.delete("/delete-rezervacija/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedReservation = await Rezervacija.findOneAndDelete({ userId });
    if (!deletedReservation) {
      return res.status(404).json({ message: "Rezervacija nav atrasta" });
    }
    res.status(200).json({ message: "Rezervacija veiksmīgi izdzēsta" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Eksportē maršrutētāju
