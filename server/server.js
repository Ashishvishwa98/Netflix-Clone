const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const connectDB = require("./config/db");
const favoriteRoutes = require("./routes/favoriteRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS force karo — Windows Node SRV fix

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
    res.send("Netflix Clone Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});