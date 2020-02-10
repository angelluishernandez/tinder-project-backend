const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.new = (req, res, next) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		avatar: req.file ? req.file.url : undefined,
		// coordinates:
		gender_prefs: req.body.gender_prefs,
		distance_prefs: req.body.distance_prefs,
		age_prefs: req.body.age_prefs,
		age: req.body.age,
		gender: req.body.gender,
		bio: req.body.bio,
	});
	user
		.save()
		.then(user => res.status(202).json(user))
		.catch(next);
};


module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw createError(400, "missing credentials");
	}
	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				throw createError(404, "user not found");
			} else {
				return user.checkPassword(password).then(match => {
					if (!match) {
						throw createError(400, "invalid password");
					} else {
						req.session.user = user;
						//res.cookie('foo', 'bar')
						res.json(user);
					}
				});
			}
		})
		.catch(next);
};

module.exports.profile = (req, res, next) => {
	const userId = req.params.id;

	User.findById(userId)
		.then(user => res.json(user))
		.catch(error => next(error));
};

module.exports.logout = (req, res, next) => {
	console.log(req.session);
	req.session.destroy();
	res.clearCookie("connect.sid");
	if (!req.session) {
		console.log("Log out");
	}
};

module.exports.doEdit = (req, res, next) => {
	const {
		name,
		email,
		password,
		coordinates,
		gender_prefs,
		distance_prefs,
		age,
		gender,
		bio,
	} = req.body;
	userModel = {
		name,
		email,
		password,
		avatar: req.file ? req.file.url : null,
		coordinates,
		gender_prefs,
		distance_prefs,
		age,
		gender,
		bio,
	};

	User.findByIdAndUpdate(req.params.id, userModel, { new: true })
		.then(user => res.json(user))
		.catch(error => next(error));
};
