const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
    name : {
        type: String ,
        required:[{message:"Name should not be empty"}] 
    },
    password:{
        type: String ,
        required:[{message:"Password should not be empty"}],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,'Please fill a valid Password address']        
    },
    email:{
        type: String ,
        unique: true,
        lowercase: true,
        required:[{message:"Email should not be empty"}],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    }
})
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();//Hashing for only new and modified passwords
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(enteredpassword) {
    return bcrypt.compareSync(enteredpassword, this.password);
};

const User = module.exports = mongoose.model('user',userSchema);