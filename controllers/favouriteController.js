const Favourite = require('../models/Favourite');

exports.getFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.find({});
        return res.status(200).json({ ok: true, favourites });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B101' });
    }
}

exports.getFavouriteById = async (req, res) => {
    const { id } = req.params;
    try {
        const favourite = await Favourite.findById(id);
        return res.status(200).json({ ok: true, favourite });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B105' });
    }
}

exports.getFavouritesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const favourites = await Favourite.find({ user: userId });
        return res.status(200).json({ ok: true, favourites });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B106' });
    }
}

exports.createFavourite = async (req, res) => {
    try {
        const favourite = new Favourite({ ...req.body });
        const savedFavourite = await favourite.save();
        return res
            .status(201)
            .json({
                ok: true,
                message: "Favourite created successfully",
                favourite: savedFavourite,
            });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error B102" });
    }
};

exports.updateFavourite = async (req, res) => {
    const { id } = req.params;
    try {
        const favourite = await Favourite.findById(id);
        if (!favourite) {
            return res.status(404).json({ ok: false, message: 'Favourite not found' });
        }
        const updatedFavourite = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ ok: true, favourite: updatedFavourite });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error B103' });
    }
}

exports.deleteFavourite = async (req, res) => {
    const { id } = req.params;
    try {
        await Favourite.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                ok: true,
                message: 'Favourite deleted successfully'
            });
    } catch {
        return res.status(500).json({ ok: false, message: "Error B104" });
    }
}
