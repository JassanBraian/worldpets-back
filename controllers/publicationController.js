const Publication = require('../models/Publication.js');

exports.getPublications = async (req, res) => {
    try {
        const publications = await Publication.find({});
        return res.status(200).json({ ok: true, publications });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B101' });
    }
}

exports.getPublicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const publication = await Publication.findById(id);
        return res.status(200).json({ ok: true, publication });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B105' });
    }
}

exports.createPublication = async (req, res) => {
    try {
        const publication = new Publication({ ...req.body });
        const savedPublication = await publication.save();
        return res
            .status(201)
            .json({
                ok: true,
                message: "Publication created successfully",
                publication: savedPublication,
            });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error B102" });
    }
};

exports.updatePublication = async (req, res) => {
    const { id } = req.params;
    try {
        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({ ok: false, message: 'Publication not found' });
        }
        const updatePublication = await Publication.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ ok: true, publication: updatePublication });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error B103' });
    }
}

exports.deletePublication = async (req, res) => {
    const { id } = req.params;
    try {
        await Publication.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                ok: true,
                message: 'Publication deleted successfully'
            });
    } catch {
        return res.status(500).json({ ok: false, message: "Error B104" });
    }
}
