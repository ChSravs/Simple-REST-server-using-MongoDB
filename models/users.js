const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name : {type: String , required:[{message:"Name is empty",code:1}] },
})
const User = module.exports = mongoose.model('user',userSchema);