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
		await Comment.findByIdAndDelete(req.params.commentId);
		res.end();
	} catch (err) {
		next(err);
	}
};

const updateComment = async (req, res, next) => {
	try {
		const { text } = req.body;
		const comment = await Comment.findByIdAndUpdate(
			req.params.commentId,
			{ text },
			{ new : true }
		);
		res.send(comment);
	} catch (err) {
		next(err);
	}
};

const commentsController = {
	createComment,
	deleteComment,
	updateComment
};

export default commentsController;