const Publication = require('../models/Publication.js');

exports.getPublication = async (req, res) => {
    try {
        const publications = await Publication.find({});
        return res.status(200).json({ ok: true, publications });
    } catch (error) {
        return res.status(500).json({ ok:false, message: 'Error B101' });
    }
}