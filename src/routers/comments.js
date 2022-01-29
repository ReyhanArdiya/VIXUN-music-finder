import Comment from "../models/comment.js";
import Song from "../models/song.js";
import express from "express";

const commentsRouter = express.Router({ mergeParams : true });
commentsRouter.use(express.json({ extended : true }));

commentsRouter.route("/")
	.post(async (req, res, next) => {
		try {
			const { text = "" } = req.body;
			const song = await Song.findById(req.params.id);
			const newComment = new Comment({
				song,
				text,
				user : req.user,
			});
			res.send(await newComment.save());
			res.end();
		} catch (err) {
			next(err);
		}
	});

export default commentsRouter;