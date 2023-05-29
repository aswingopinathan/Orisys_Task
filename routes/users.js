var express = require('express');
const { register, login } = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register',register);

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',login);


module.exports = router;
