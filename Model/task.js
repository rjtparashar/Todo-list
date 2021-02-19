const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userTask = new Schema({
    title:{
        type:String,
        require : true
    },
    description :{
        type:String,
        require:true
         },
    userId:{
        type:Schema.ObjectId,
        ref:'user'
    },
    completed:{
        type:Boolean,
        default:false
    },
    completed_on:{
        type:Date,
        default:null

    },
},{
     timestamps: true,
     toObject: {virtuals: true},
     toJSON: {virtuals: true}
})
const task = mongoose.model('Task', userTask);
module.exports = task
