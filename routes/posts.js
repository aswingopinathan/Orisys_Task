var express = require('express');
const { getPost, writePost, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../utils/multerEngine');
var router = express.Router();
const validator=(req,res,next)=>{
    if(req.session.user){
      next();
    }else{
        res.redirect('/users/login')
    }
  }

router.get('/createblog',validator,function(req, res, next) {
    res.render('createblog', { title: 'Express' });
  });

router.post('/createblog',validator,upload.single("pic"),writePost);

router.get('/',validator,getPost);

router.get('/updatepost/:id',validator, function(req, res, next) {
    let uniqueId=req.params.id
    res.render('updateblog', { uniqueId });
  });

router.post('/updatepost',validator,upload.single("pic"),updatePost);

router.post('/deletepost/:id',validator,deletePost);

module.exports = router;
