const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, 8, (err, data)=>{
        if(err){
            throw new Error("Error in hashing password");
        }
        this.password = data;
        next();
    });
})

let User = mongoose.model("users_data", userSchema)

module.exports = {
    User
}