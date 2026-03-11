const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        type:{
            type:String,
            enum:["Credit","Withdraw","Transfer","Received"],
            required: true,
        },
        amount:{
            type:Number,
            required:true,
        },
        balanceAfter: {
            type: Number,
            required: true,
        },
        fromAccount:{
            type:String
        },
        toAccount:{
            type:String
        },

    },{timestamps:true}
);

module.exports = mongoose.model("Transaction",transactionSchema);