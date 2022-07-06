const Comment = require('../models/Comment.js');

exports.getComments = async (req, res) => {
    try {
        let comments = [];
        req.body.publiId ?
            comments = await Comment.find({ publication: req.body.publiId })
            :
            comments = await Comment.find({});
        return res.status(200).json({ ok: true, comments });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B101' });
    }
}

exports.getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        console.log(comment)
        return res.status(200).json({ ok: true, comment });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error B105' });
    }
}

exports.createComment = async (req, res) => {
    try {
        const comment = new Comment({ ...req.body });
        const savedComment = await comment.save();
        return res
            .status(201)
            .json({
                ok: true,
                message: "Comment created successfully",
                comment: savedComment,
            });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error B102" });
    }
};

exports.updateComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ ok: false, message: 'Comment not found' });
        }
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ ok: true, comment: updatedComment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error B103' });
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                ok: true,
                message: 'Comment deleted successfully'
            });
    } catch {
        return res.status(500).json({ ok: false, message: "Error B104" });
    }
}
