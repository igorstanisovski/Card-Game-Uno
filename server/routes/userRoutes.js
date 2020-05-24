var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var path = require('path');
var multer = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
var upload = multer({ storage: storage });

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/',upload.single('picture') ,userController.create);
router.post('/login', userController.login);
router.post('/start',userController.gameStart);
router.post('/win',userController.gameWon);
router.post('/editprofile', userController.editProfile);
router.post('/changepassword',userController.changePassword);
/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
