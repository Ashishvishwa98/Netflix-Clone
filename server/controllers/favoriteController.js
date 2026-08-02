const User = require("../models/User");

// Get Favorites
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add Favorite
exports.addFavorite = async (req, res) => {
    try {
        const { movieId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user.favorites.includes(Number(movieId))) {
            user.favorites.push(Number(movieId));
            await user.save();
        }

        res.json({
            message: "Added to My List",
            favorites: user.favorites,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove Favorite
exports.removeFavorite = async (req, res) => {
    try {
        const { movieId } = req.params;

        const user = await User.findById(req.user._id);

        user.favorites = user.favorites.filter(
            (id) => id !== Number(movieId)
        );

        await user.save();

        res.json({
            message: "Removed",
            favorites: user.favorites,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};