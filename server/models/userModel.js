var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
	'name' : String,
	'lastname' : String,
	'username' : String,
	'email' : String,
	'password' : String,
	'country' : String,
	'city' : String,
	'address' : String,
	'age' : Number,
	'gender' : String,
	'zip': Number,
	'picture_path': String,
	'gameSettings': {
		'gamesPlayed':Number,
		'wins':Number,
	}
});

userSchema.pre('save', function (next) {
	var Auser = this;
	User.findOne({ username: Auser.username })
	.exec(function (err,user){
		if(err){
			return next(err);
		}
		if(user){
			var error = new Error();
			error.status = 401;
			error.message = 'User already exists';
			return next(error);
		}
		bcrypt.hash(Auser.password, 10, function (err, hash) {
			if (err) {
				return next(err);
			}
			Auser.password = hash;
			next();
		});
	});
});

userSchema.statics.authenticate = function (username, password, callback) {
	User.findOne({ username: username })
	.exec(function (err, user) {
	if (err) {
		return callback(err)
	} else if (!user) {
		var err = new Error('User not found.');
		err.status = 401;
		return callback(err);
	}
	bcrypt.compare(password, user.password, function (err, result) {
		if (result === true) {
		return callback(null, user);
		} else {
		return callback();
		}
	})
	});
};

userSchema.statics.changePassword = function(username, password, newPassword, callback) {
	User.findOne({ username: username })
	.exec(function (err, user) {
	if (err) {
		return callback(err)
	} else if (!user) {
		var err = new Error('User not found.');
		err.status = 401;
		return callback(err);
	}
	bcrypt.compare(password, user.password, function (err, result) {
		if (result === true) {
			bcrypt.hash(newPassword, 10, function (err, hash) {
				if (err) {
					return callback();
				}
				User.findOneAndUpdate({username: user.username},{$set: {'password' : hash}}, {new: true, useFindAndModify: false}, function (err, user) {
					if (err) {
						return res.status(500).json({
							message: 'Error when getting user',
							error: err
						});
					}
					if (!user) {
						return res.status(404).json({
							message: 'No such user'
						});
					}
					return callback(null, user);
				});
			});
		} 
		else {
		return callback();
		}
	})
	})
};

var User = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema);
