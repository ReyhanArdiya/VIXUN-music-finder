/*  eslint-disable no-unused-vars */
const handleNotFound = (req, res) => {
	res.status(404).send("404 Not found :(");
};

const handleSameUser = (err, req, res, next) => {
	if (err.name === "UserExistsError") {
		req.flash("error", err.message);
		res.redirect("/auth/register");
	} else {
		next(err);
	}
};

const handleAnyError = (err, req, res, next) => {
	const {
		status = 500,
		message = "Something went wrong :("
	} = err;
	res.status(status).send(message);
};

const errHandlers = {
	handleAnyError,
	handleNotFound,
	handleSameUser,
};

export default errHandlers;