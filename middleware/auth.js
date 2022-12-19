require("express-async-errors")
const jwt = require("jsonwebtoken");
let authorize = (req, res, next)=>{
    let {authorization} = req.headers;
    if(!authorization){
        throw new Error("No Authorization...")
    }
    authorization = authorization.split(" ")
    jwt.verify(authorization[1], process.env.JSONWEBTOKEN, (err, data)=>{
        if(err){
            throw new Error("Authorization isn't correct")
        }
        next();
    })
}

module.exports = {
    authorize
}