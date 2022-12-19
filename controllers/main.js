require("express-async-errors")
const jwt = require("jsonwebtoken");
const { User } = require("../model/schema")
const bcrypt = require("bcrypt");
let dashboard = async (req, res, next)=>{
    let luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: "Hello", secret: luckyNumber})
}

let signup = async (req, res, next) => {
    let {username, password} = req.body
    if(!username || !password){
        throw new Error("Provide username and password...")
    }
    let user = await User.find({username : username});
    console.log(user.length)
    if(!(user.length === 0)){
        throw new Error("User already exists...")
    }
    await User.create(req.body);
    res.send("User Created")
}

let login = async(req, res, next)=>{
    let {username, password} = req.body
    if(!username || !password){
        throw new Error("Invalid... Provide username and password")
    }
    let getUser = await User.find({username});
    if(getUser.length === 0){
        throw new Error("User didn't exist. Pls signup <a href='/api/v1/signup'>Signup</a>")
    }
    let isPassword = await bcrypt.compare(password, getUser[0].password);
    if(!isPassword){
        throw new Error("Password is incorrect")
    }
    let token = jwt.sign({username}, process.env.JSONWEBTOKEN,{expiresIn:"30d"});
    res.status(200).json({username, token})
}

module.exports = {
    dashboard,
    login,
    signup
}