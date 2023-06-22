const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const requireAuthentication = async(req,res,next) =>{
        const { authorization } = req.headers;
        if(!authorization)
        {
            res.status(400).json({error: 'No token, access denied'});
        }
        const token = authorization.splice(' ')[0];
        try {
            const { _id } = jwt.verify(token, process.env.SECRET);
            req.user = await Users.findOne({_id}).select('_id');
            next();
        } catch (error) {
          res.status(400).json({error: 'Invalid token'})  
        }
}