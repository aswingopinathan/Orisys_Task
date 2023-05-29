var express = require('express');
const { getPost, writePost, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../utils/multerEngine');
var router = express.Router();

router.get('/createblog', function(req, res, next) {
    res.render('createblog', { title: 'Express' });
  });

router.post('/createblog',upload.single("pic"),writePost);

router.get('/',getPost);

router.get('/updatepost', function(req, res, next) {
    res.render('updateblog', { title: 'Express' });
  });

router.post('/updatepost/:id',upload.single("pic"),updatePost);

router.post('/deletepost/:id',deletePost);

module.exports = router;
