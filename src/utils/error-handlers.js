/*  eslint-disable no-unused-vars */
const handleNotFound = (req, res) => {
	req.flash("error", "Not found :(");
	res.status(404).redirect("/");
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