var express = require('express');
var router = express.Router();
const User = require('../models/users');

/* GET all users listing. */
//Should Remove
router.get('/', function(req, res, next) {
  User.find((function(err, results){
    if (err) return next(err);
    res.send(results);
  }));
});
/*New User Registration*/
router.post('/addUser', function(req, res, next) {
  User.create(req.body , function(err , user){
      if (err) return next(err);
      res.json(user);
  });
});
/** User Authentication */
router.post('/auth',function(req,res,next){
  User.findOne({name:req.body.name},(function(err,results){
    if(err) return next(err);
    else if(!results.comparePassword(req.body.password))
      return res.json({msg:"Invalid Password"});
    res.send(results);
    }))
})
/** User Details Updation */
router.put('/update',function(req,res,next){
    User.update({name:req.body.old},{name:req.body.new}, function(err , user){
      if (err) return next(err);
      res.json(user);
  });
});
/** User Unregistration */
router.delete('/delete',function(req,res,next){
  User.remove({name:req.body.name}, function(err , user){
    if (err) return next(err);
    res.json(user);
  });
});
module.exports = router;
