const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deviceSchema = new Schema({
    userKey:{
        type:String,
        required:[{message:"Userkey not be empty"}] 
    },
    MAC:{
        type:String,
        unique:true,
        required:[{message:"MAC address not be empty"}]
    },
    DeviceName:{
        type:String,
        required:[{message:"Device name not be empty"}]
    }
});
deviceSchema.index({userKey:1,DeviceName:1},{unique:true});

const Device = module.exports = mongoose.model('device',deviceSchema);