import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
	comments : [ {
		ref  : "Comment",
		type : mongoose.Types.ObjectId
	} ],
	email : {
		required : true,
		type     : String
	},
}, { strict : "throw" });

UserSchema.plugin(passportLocalMongoose);

class UserSchemaMethods {}
UserSchema.loadClass(UserSchemaMethods);

const User = mongoose.model("User", UserSchema);

export default User;