export const checkLogin = (req, res, next) => {
	if (req.isUnauthenticated()) {
		res.redirect("/auth/login");
	} else {
		next();
	}
};

export const addLastVisitedToSes = (req, res, next) => {
	req.session.lastVisited = req.originalUrl;
	next();
};

export const goToLastVisited = (req, res) => {
	res.redirect(req.session.lastVisited || "/");
	delete req.session.lastVisited;
};

export const addLocalVariables = (req, res, next) => {
	res.locals.user = req.user;
	next();
};

export const requestLogger = (req, res, next) => {
	const date = new Date();
	const log =
        "π You got a new request! ( πΈβ§β‘β¦)~π \\(οΏ£β½οΏ£* )γ π" +
        `β ${date.toLocaleString()} β`;
	console.log(log);
	next();
};