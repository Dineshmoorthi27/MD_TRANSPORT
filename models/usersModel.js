const  mongoose  = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean ,
        default: false
    }
},{
    timestamps: true //Saves created at and updated at as dates (ISO 8
    
});

module.exports = mongoose.model('users',userschema);
