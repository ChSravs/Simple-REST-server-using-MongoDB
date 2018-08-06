var express = require('express');
var router = express.Router();
const Device = require('../models/devices');

/* GET Devices listing. */
router.get('/', function(req, res, next) {
    Device.find((function(err, results){
    if (err) return next(err);
    res.send(results);
  }));
});
/** New Device added to a user */
router.post('/addDevice', function(req, res, next) {
    Device.create(req.body, function(err, results){
        if(err) return next(err);
        res.json(results);
    });
});

router.put('/update',function(req,res,next){
    Device.update({
        $and:[{userKey:req.body.userKey},{DeviceName:req.body.oldDeviceName}]},
        [{userKey:req.body.userKey},{MAC:req.body.MAC},{DeviceName:req.body.newDeviceName}], 
        function(err , user){
            if (err) return next(err);
            res.json(user);
        }
    );
});
router.delete('/delete',function(req,res,next){
  Device.remove({$and:[{userKey:req.body.userKey},{DeviceName:req.body.DeviceName}]}, function(err , user){
    if (err) return next(err);
    res.json(user);
  });
});
module.exports = router;
