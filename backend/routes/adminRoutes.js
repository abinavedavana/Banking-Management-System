const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Admin Login
router.post("/login", async (req,res) => {
    try{
        const {email , password} = req.body;

        //Check User
        const admin = await User.findOne({email});

        if(!admin || admin.role !== "admin") {
            return res.status(400).json({message:"Invalid Admin Credentials"});
        }

        //Compare password
        const isMatch = await bcrypt.compare(password , admin.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Admin Credentials"})
        }

        //Create token
        const token = jwt.sign(
            {id: admin._id , role: admin.role},
            process.env.JWT_SECRET, 
            {expiresIn:"1d"}
        );

        console.log("Login attempt:", email);
        console.log("Admin found:", admin);

        res.json({
            message:"Admin Login Successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });


    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
})

//Get all users
router.get("/users", async (req,res) => {
    try{
        const users = await User.find({ role:"user"});

        res.json({
            totalUsers: users.length,
            users,
        })
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
})


//Get user transaction history
router.get("/transactions/:userId", async (req,res) =>{
    try{
        const Transaction = require("../models/Transaction");

        const transactions = await Transaction.find({
            user:req.params.userId
        }).sort({createdAt:-1});

        res.json(transactions);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});


router.get("/users/:id" , async(req,res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message:"User not found"});
            }

         res.json(user);

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})

module.exports = router;