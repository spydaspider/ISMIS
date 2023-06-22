const User = require('../models/users.js');
const jwt = require('jsonwebtoken');
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'});
}
const signup = async(req,res)=>{
    const { username, password } = req.body;
    try {
         const user = await User.signup(username,password);
         const token = createToken(user.id);
         res.status(200).json({username, token}); 
       } 
    catch (error) {
        res.status(401).json({error: error.message});
    }
}
const login = async(req,res)=>{
    const { username, password } = req.body;
    try {
        const user = await User.login(username,password);
        const token = createToken(user.id);
        res.status(200).json({username,token});
        
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}
module.exports = {
    login, signup
}