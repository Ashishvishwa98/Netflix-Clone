const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getFavorites,
    addFavorite,
    removeFavorite,
} = require("../controllers/favoriteController");

router.get("/", protect, getFavorites);

router.post("/:movieId", protect, addFavorite);

router.delete("/:movieId", protect, removeFavorite);

module.exports = router;