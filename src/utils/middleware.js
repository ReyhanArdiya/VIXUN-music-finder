export const checkLogin = (req, res, next) => {
	if (req.isUnauthenticated()) {
		res.redirect("/auth/login");
	} else {
		next();
	}
};