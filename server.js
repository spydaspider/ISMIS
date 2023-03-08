const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { parseArgs } = require("util");
const database = JSON.parse(fs.readFileSync('./data/db.json',"UTF-8"));
const server = jsonServer.create();
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
const SECRETE_KEY = "9878768";
const expires = "1h";
function createToken(payload)
{
    return jwt.sign(payload,SECRETE_KEY,{expires});
}
function isAuthenticated({username,password})
{
    return(
        database.users.findIndex((user)=> user.username === username && user.password === password) !== -1

    )
}
server.post('/api/auth/register',(req,res)=>{
    const {username, password} = req.body;
    if(isAuthenticated({username,password}))
    {
        const status = 401;
        const message = "Username has been taken";
        res.status(status).json({status,message});
        return;
    }
    fs.readFile('./data/db.json',(err,data)=>{
        if(err)
        {
            const status = 401;
            const message = err;
            res.status(status).json({status,message});
            return;
        }
       data = JSON.parse(data.toString());
        let lastId = data.users[data.users.length-1].id;
        data.users.push({username: username, password: password});
        let writeData = fs.writeFile('./data/db.json',JSON.stringify(data),(err)=>{
            if(err)
            {
                const status = 401;
                const message = err;
                res.status(status).json({status,message});
                return;
            }
        })

    })
    const accessToken = createToken({username,password});
    res.status(200).json({accessToken});

})
server.post('/api/auth/login',(req,res)=>{
    const {username, password} = req.body;
    if(isAuthenticated({username,password}))
    {
        const status = 401;
        const message = "Invalid username or password";
        res.status(status).json({status,message});
        return;
    }
    const accessToken = createToken({username,password});
    res.status(200).json({accessToken});

})
server.listen(5000,()=>{
    console.log("listening to port 5000 of the localhost");
})