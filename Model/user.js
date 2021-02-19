var express = require("express")
app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    name :{
        type : String,
        require : true
    },
    password :{
        type : String,
        require:true
    },
    email :{
        type : String,
        require : true
    }
})
const user = mongoose.model('user', userSchema);
module.exports = user