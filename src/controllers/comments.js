import Comment from "../models/comment.js";
import Song from "../models/song.js";

const createComment = async (req, res, next) => {
	try {
		const { text = "" } = req.body;
		const song = await Song.findById(req.params.id);
		const newComment = new Comment({
			song,
			text,
			user : req.user,
		});
		res.send(await newComment.save());
	} catch (err) {
		next(err);
	}
};

const commentsController = { createComment };

export default commentsController;