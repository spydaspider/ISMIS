const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordAgain:{
        type: String,
        required: true
    }
});
UserSchema.statics.signup = async function(username, password)
{
    if(!username || !password)
    {
        throw Error('Fill in all fields');
    }
    if(password !== passwordAgain)
    {
        throw Error('Passwords do not much');
    }
    const exist = await this.findOne({username});
    if(exist)
    {
        throw Error('Username is already taken');
    }
    if(!validator.isStrongPassword(password))
    {
        throwError('Password is weak');
    }
    //hash the password 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({username,password:hash})
    return user;

    
}
UserSchema.statics.login = async function(username, password)
{
    if(!username || !password)
    {
        throw Error('Provide username and password');
    }

    const user = await this.findOne({username});
    if(!user)
    {
        throw Error('Username is incorrect');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        throw Error('Password is incorrect');
    }
    return user;
}
module.exports = mongoose.model('User', UserSchema);