var express = require('express');
const { register, login } = require('../controllers/userController');
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


module.exports = router;
