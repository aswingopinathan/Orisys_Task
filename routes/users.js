var express = require('express');
const { register, login, logout } = require('../controllers/userController');
var router = express.Router();
const userCheck=(req,res,next)=>{
  if(!req.session.user){
    next();
  }else{
      res.redirect('/posts')
  }
}

router.get('/',userCheck, function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register',userCheck,register);

router.get('/login',userCheck, function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',userCheck,login);

router.get('/logout',logout);



module.exports = router;
