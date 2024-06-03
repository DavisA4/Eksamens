const express = require("express"); // Importē express bibliotēku
const bcrypt = require("bcrypt"); // Importē bcrypt bibliotēku paroļu šifrēšanai
const jwt = require("jsonwebtoken"); // Importē jsonwebtoken bibliotēku tokenu ģenerēšanai un verificēšanai
const router = express.Router(); // Izveido express maršrutētāju
const multer = require("multer"); // Importē multer bibliotēku failu augšupielādēšanai
const Lietotajs = require("../models/Lietotajs"); // Importē Lietotajs modeli

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

// GET maršruts lietotāju iegūšanai
router.get("/", authenticateMiddleware, async (req, res) => {
  try {
    // Iegūst lietotājus ar statusu "lietotajs"
    const users = await Lietotajs.find({ loma: "lietotajs" });

    // Pārveido licences datus uz URL
    const usersWithLicenseUrls = users.map((user) => {
      const licenseUrl = `data:${user.license.contentType};base64,${user.license.data.toString("base64")}`;
      return { ...user.toObject(), licenseUrl }; // Pievieno licenseUrl lietotāja objektam
    });
    
    res.json(usersWithLicenseUrls);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT maršruts lietotāja verificēšanai
router.put("/:userId/verify", authenticateMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    // Atrod lietotāju pēc ID
    const user = await Lietotajs.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Lietotājs nav atrasts" });
    }

    // Atjauno lietotāja statusu
    user.statuss = "Verificēts";

    // Saglabā atjaunināto lietotāju
    await user.save();

    res.status(200).json({ message: "Lietotāja apliecība veiksmīgi pārbaudīta" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT maršruts lietotāja atteikšanai
router.put("/:userId/reject", authenticateMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    // Atrod lietotāju pēc ID
    const user = await Lietotajs.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Atjauno lietotāja statusu
    user.statuss = "Atteikts";

    // Saglabā atjaunināto lietotāju
    await user.save();

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST maršruts lietotāja reģistrācijai
router.post("/registracija", upload.single("image"), async (req, res) => {
  try {
    const { lietotajvards, parole } = req.body;

    const eksistejossLietotajs = await Lietotajs.findOne({ lietotajvards });
    if (eksistejossLietotajs) {
      return res.status(400).json({ message: "Lietotājs jau eksistē!" });
    }

    const jaunsLietotajs = new Lietotajs({
      lietotajvards,
      parole,
      // Pieņemot, ka augšupielādētais attēls ir saglabāts req.file
      license: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      createdAt: new Date(),
    });

    await jaunsLietotajs.save();

    res.status(201).json({ message: "Veiksmīga reģistrācija" });
  } catch (error) {
    if (error.message === "Lietotājs jau eksistē!") {
      return res.status(400).json({ message: "Lietotājs jau eksistē!" });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Servera kļūda" });
    }
  }
});

// POST maršruts lietotāja pieteikšanai
router.post("/login", async (req, res) => {
  try {
    const { lietotajvards, parole } = req.body;

    // Pārbauda, vai lietotājs eksistē
    const lietotajs = await Lietotajs.findOne({ lietotajvards });
    if (!lietotajs) {
      return res
        .status(401)
        .json({ message: "Nepareizs lietotājvārds vai parole" });
    }

    // Pārbauda, vai parole ir pareiza
    const parolesParbaude = await bcrypt.compare(parole, lietotajs.parole);
    if (!parolesParbaude) {
      return res
        .status(401)
        .json({ message: "Nepareizs lietotājvārds vai parole" });
    }

    const token = jwt.sign(
      {
        userId: lietotajs._id,
        username: lietotajs.lietotajvards,
        role: lietotajs.loma,
      },
      process.env.token
    );

    res.status(200).json({ message: "Veiksmīgas pieteikšanas", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Servera kļūda" });
  }
});

// GET maršruts lietotāja profilam
router.get("/profile", authenticateMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Iegūst lietotāja datus no datubāzes, izmantojot lietotāja ID
    const user = await Lietotajs.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE maršruts lietotāja dzēšanai
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Atrod lietotāju pēc ID un dzēš no datubāzes
    const deletedUser = await Lietotajs.findByIdAndDelete(userId);

    if (!deletedUser) {
      // Ja lietotājs ar doto ID nav atrasts, atgriež 404 statusu
      return res.status(404).json({ message: "User not found" });
    }

    // Atbild ar veiksmīgu ziņojumu
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Ja rodas kļūda, atgriež 500 statusu ar kļūdas ziņojumu
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { lietotajvards, parole } = req.body;

    // Check if the user exists
    const lietotajs = await Lietotajs.findOne({ lietotajvards });
    if (!lietotajs) {
      return res
        .status(401)
        .json({ message: "Nepareizs lietotājvārds vai parole" });
    }

    if (lietotajs.statuss !== "Verificēts") {
      return res
        .status(401)
        .json({ message: "Jūsu konts nav verificēts. Lūdzu, sazinieties ar administratoru." });
    }

    // Check if the password is correct
    const parolesParbaude = await bcrypt.compare(parole, lietotajs.parole);
    if (!parolesParbaude) {
      return res
        .status(401)
        .json({ message: "Nepareizs lietotājvārds vai parole" });
    }

    const token = jwt.sign(
      {
        userId: lietotajs._id,
        username: lietotajs.lietotajvards,
        role: lietotajs.loma,
      },
      process.env.token
    );

    res.status(200).json({ message: "Veiksmīgas pieteikšanas", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Servera kļūda" });
  }
});

module.exports = router; // Eksportē maršrutētāju
