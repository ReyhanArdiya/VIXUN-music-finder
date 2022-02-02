import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
	comments : [ {
		ref  : "Comment",
		type : mongoose.Schema.Types.ObjectId
	} ],
	email : {
		required : true,
		type     : String
	},
	favorites : [ {
		ref  : "Song",
		type : mongoose.Schema.Types.ObjectId
	} ]
}, { strict : "throw" });

UserSchema.plugin(passportLocalMongoose);

class UserSchemaMethods {}
UserSchema.loadClass(UserSchemaMethods);

const User = mongoose.model("User", UserSchema);

export default User;