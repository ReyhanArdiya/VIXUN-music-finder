import mongoose from "mongoose";

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