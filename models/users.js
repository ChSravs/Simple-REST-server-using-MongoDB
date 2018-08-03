const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name : {
        type: String ,
        required:[{message:"Name should not be empty",code:1}] 
    },
    password:{
        type: String ,
        required:[{message:"Password should not be empty",code:1}],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,'Please fill a valid Password address']        
    },
    email:{
        type: String ,
        unique: true,
        lowercase: true,
        required:[{message:"Email should not be empty",code:1}],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    }
})
const User = module.exports = mongoose.model('user',userSchema);