const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        username:{
            type:String,
            required:true,
            unique:true
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        dob:{
            type : String,
        },
        address : String,
        phone : Number,
        age : Number,
        aadhar : String,
        pan : String,

        profilePic:String,


        accountNumber: {
            type: String,
            unique: true,
        },

        balance: {
            type: Number,
            default:0,
        },

        role: {
            type: String,
            enum: ["user","admin"],
            default:"user",
        }, 
        
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);