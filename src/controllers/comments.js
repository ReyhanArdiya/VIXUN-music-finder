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

const deleteComment = async (req, res, next) => {
	try {
		res.send(await Comment.findByIdAndDelete(req.params.commentId));
	} catch (err) {
		next(err);
	}
};

const commentsController = {
	createComment,
	deleteComment
};

export default commentsController;