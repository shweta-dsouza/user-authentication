const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: 'Full Name cannot be empty'
	},
	email: {
		type: String,
		required: 'Email cannot be empty',
		unique: true
	},
	password: {
		type: String,
		required: 'Password cannot be empty',
		minlength: [4, 'Password must be atleast 4 character long']
	},
	saltSecret: String
});


// Custom Validation for email
userSchema.path('email').validate((val) => {
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(val);
}, 'Inavlid E-mail');

// Events
userSchema.pre('save', function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(this.password, salt, (err, hash) => {
			this.password = hash;
			this.saltSecret = salt;
			next();
		});
	});
});

// Verify password method
userSchema.methods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

// generate IWT token method
userSchema.methods.generateJwt = function () {
	return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
}

mongoose.model('User', userSchema);