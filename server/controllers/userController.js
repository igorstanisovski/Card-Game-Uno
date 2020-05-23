var userModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    login: function (req, res,next) {
        userModel.authenticate(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.status(201).json(user);
            }
        })
    },
    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var userData = JSON.parse(req.body.user);
        var user = new userModel({
			name : userData.name,
			lastname : userData.lastname,
			username : userData.username,
			email : userData.email,
			password : userData.password,
			country : userData.country,
			city : userData.city,
			address : userData.address,
			age : userData.age,
            gender : userData.gender,
            zip : userData.zip,
            picture_path: 'images/'+req.file.filename,
            gameSettings: {
                gamesPlayed:0,
                wins:0
            }
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
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

            user.name = req.body.name ? req.body.name : user.name;
			user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
			user.username = req.body.username ? req.body.username : user.username;
			user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			user.country = req.body.country ? req.body.country : user.country;
			user.city = req.body.city ? req.body.city : user.city;
			user.address = req.body.address ? req.body.address : user.address;
			user.age = req.body.age ? req.body.age : user.age;
			user.gender = req.body.gender ? req.body.gender : user.gender;
			user.zip = req.body.zip ? req.body.zip : user.zip;
			user.picture_path = req.body.picture_path ? req.body.picture_path : user.picture_path;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    gameStart: function (req,res) {
        var username = req.body.username;
        userModel.findOneAndUpdate({username: username},{$inc: {'gameSettings.gamesPlayed' : 1}}, {new: true, useFindAndModify: false}, function (err, user) {
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
            //user.gameSettings.gamesPlayed = user.gameSettings.gamesPlayed + 1;
        });
    },
    gameWon: function (req,res) {
        var username = req.body.username;
        userModel.findOneAndUpdate({username: username},{$inc: {'gameSettings.wins' : 1}}, {new: true, useFindAndModify: false}, function (err, user) {
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
            //user.gameSettings.gamesPlayed = user.gameSettings.gamesPlayed + 1;
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
