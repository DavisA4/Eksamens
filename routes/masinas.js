const express = require("express"); // Importē express bibliotēku

const jwt = require("jsonwebtoken"); // Importē jsonwebtoken bibliotēku tokenu ģenerēšanai un verificēšanai
const router = express.Router(); // Izveido express maršrutētāju
const Masina = require("../models/Masinas"); // Importē Masina modeli
const multer = require("multer"); // Importē multer bibliotēku failu augšupielādēšanai

const storage = multer.memoryStorage(); // Definē atmiņas uzglabāšanu failiem
const upload = multer({ storage: storage }); // Izveido multer augšupielādes objektu

require("dotenv").config(); // Ielādē vides mainīgos no .env faila

// Middleware autentifikācijai
function authenticateMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.token, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

// GET maršruts automašīnu iegūšanai
router.get("/", async (req, res) => {
  try {
    const masinas = await Masina.find();
    // Pārveido attēlu datus uz URL
    const masinasWithUrls = masinas.map((masina) => {
      const imageUrls = masina.Images.map((image) => {
        return `data:${image.contentType};base64,${image.data.toString(
          "base64"
        )}`;
      });
      return { ...masina.toObject(), imageUrls }; // Pievieno imageUrls automašīnas objektam
    });
    res.json(masinasWithUrls);
  } catch (error) {
    console.error("Error fetching masinas:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST maršruts jaunas automašīnas pievienošanai
router.post("/add-masina", upload.array("image", 3), async (req, res) => {
  try {
    const newModel = req.body; // Iegūst modeļa datus no pieprasījuma ķermeņa
    const images = req.files; // Iegūst augšupielādētos attēlu failus

    // Pārbauda, vai attēli tika augšupielādēti
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Image files are required" });
    }

    // Parsē koordinātas no pieprasījuma ķermeņa
    const coordinates = JSON.parse(req.body.coordinates || "{}");

    // Izveido masīvu attēlu datu saglabāšanai
    const imageArray = images.map((image) => ({
      data: image.buffer,
      contentType: image.mimetype,
    }));

    // Izveido jaunu Masina modeļa instanci ar attēlu datiem un koordinātām
    const model = new Masina({
      ...newModel,
      Images: imageArray, // Saglabā attēlu datus datubāzē
      Coordinates: coordinates, // Saglabā koordinātas datubāzē
      Status: "Pieejams",
    });

    // Saglabā jauno modeli datubāzē
    await model.save();

    // Atbild ar jaunizveidoto modeli
    res.status(201).json(model);
  } catch (error) {
    console.error("Error adding model:", error);
    res.status(500).json({ message: "Server error" }); // Apstrādā servera kļūdu
  }
});

// PUT maršruts automašīnas atjaunināšanai
router.put("/:id", upload.array("image", 3), async (req, res) => {
  try {
    const updatedModelData = req.body; // Iegūst atjauninātos modeļa datus no pieprasījuma ķermeņa
    const images = req.files; // Iegūst augšupielādētos attēlu failus

    // Atrod Masina pēc ID
    const masina = await Masina.findById(req.params.id);

    // Pārbauda, vai Masina eksistē
    if (!masina) {
      return res.status(404).json({ message: "Masina not found" });
    }

    // Atjaunina Masina laukus ar jauniem datiem
    masina.Model = updatedModelData.Model;
    masina.Description = updatedModelData.Description;
    masina.OneH = updatedModelData.OneH;
    masina.TwoH = updatedModelData.TwoH;
    masina.FiveH = updatedModelData.FiveH;
    masina.OneD = updatedModelData.OneD;

    // Pārbauda, vai attēli tika augšupielādēti
    if (images && images.length > 0) {
      // Izveido masīvu attēlu datu saglabāšanai
      const imageArray = images.map((image) => ({
        data: image.buffer,
        contentType: image.mimetype,
      }));

      // Atjaunina attēlu datus
      masina.Images = imageArray;
    }

    // Saglabā atjaunināto Masina datubāzē
    await masina.save();

    // Atbild ar atjaunināto Masina
    res.json(masina);
  } catch (error) {
    console.error("Error updating masina:", error);
    res.status(500).json({ message: "Server error" }); // Apstrādā servera kļūdu
  }
});

// DELETE maršruts automašīnas dzēšanai
router.delete("/:id", authenticateMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCar = await Masina.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res
      .status(200)
      .json({ message: "Car deleted successfully", car: deletedCar });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // Eksportē maršrutētāju
