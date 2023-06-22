const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/usersRoute.js');
const salesRoute = require('./routes/salesRoute.js');
const itemsRoute = require('./routes/itemsRoute.js');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.method, req.path);
    next();
});
const PORT = process.env.PORT || 5000;
const MONGOSTR = process.env.MONGO_URI;
app.use('/api/users',usersRoute);
app.use('/api/items', itemsRoute);
app.use('/api/sales', salesRoute); 
mongoose.connect(MONGOSTR).then(()=>{
    app.listen(PORT,()=>console.log(`Connected to mongo db on port ${PORT}`));
}).catch((error)=>console.error(error));
