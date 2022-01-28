import mongoose from "mongoose";

/**
 * Type for instance of {@link Comment}.
 *
 * @typedef {import("mongoose").Document & {
 * song: import("./song.js").SongDocument
 * text: string
 * user: import("./user.js").UserDocument
 * }} CommentDocument
 */
const CommentSchema = new mongoose.Schema({
	song : {
		required : true,
		type     : mongoose.Types.ObjectId
	},
	text : {
		required : true,
		type     : String
	},
	user : {
		required : true,
		type     : mongoose.Types.ObjectId
	},
}, { strict : "throw" });

class CommentSchemaMethods {}
CommentSchema.loadClass(CommentSchemaMethods);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;