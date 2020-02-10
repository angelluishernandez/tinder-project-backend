const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minlength: [3, "Your name needs at least 3 characters"],
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			match: [EMAIL_PATTERN, "Email is invalid"],
		},
		password: {
			type: String,
			minlength: [8, "Your password needs at least 8 characters"],
			required: true,
		},
		avatar: String,
		localization: {
			type: String,
			enum: ["Point"], //required: true
		},
		coordinates: {
			type: [Number],
			//required: true
		},
		gender_prefs: {
			type: String,
			enum: ["Male", "Female", "Both"],
		},
		distance_prefs: Number,
		age_prefs: {
			type: Number,
			min: 18,
			max: 120,
		},
		age: {
			type: Number,
			min: 18,
			max: 120,
		},
		gender: {
			type: String,
			enum: ["Male", "Female"],
		},
		bio: String,
	},
	{ timestamps: true }
);

userSchema.pre("save", function(next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt
			.genSalt(SALT_WORK_FACTOR)
			.then(salt => {
				return bcrypt.hash(user.password, salt).then(hash => {
					user.password = hash;
					next();
				});
			})
			.catch(error => next(error));
	} else {
		next();
	}
});
userSchema.methods.checkPassword = function(password) {
	return bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;
