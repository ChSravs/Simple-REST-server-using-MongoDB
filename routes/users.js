var express = require('express');
var router = express.Router();
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((function(err, results){
    if (err) return next(err);
    res.send(results);
  }));
  
});
router.post('/addUser', function(req, res, next) {
  User.create(req.body , function(err , user){
      if (err) return next(err);
      res.json(user);
  });
});
router.put('/update',function(req,res,next){
    User.update({name:req.body.old},{name:req.body.new}, function(err , user){
      if (err) return next(err);
      res.json(user);
  });
});
router.delete('/delete',function(req,res,next){
  User.remove({name:req.body.name}, function(err , user){
    if (err) return next(err);
    res.json(user);
  });
});
module.exports = router;
