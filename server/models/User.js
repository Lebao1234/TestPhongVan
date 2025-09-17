const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    Firstname :{type: String, unique:true, required: true},
    Lastname :{type: String, unique:true, required:true},
    Email : {type : String, unique:true, required:true},
    Password: {type : String, required:true}
})

userSchema.pre('save', async function name(next) {
    if(this.isModified('Password')) return next();
        this.Password= await bcrypt.hash(this.Password, 10); 
    next();
})

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.Password)
};

const User = mongoose.model('User', userSchema);

module.exports = User;

