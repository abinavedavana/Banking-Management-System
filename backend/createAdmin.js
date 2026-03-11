const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const createAdmin = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const existingAdmin = await User.findOne({email:"admin@gmail.com"});
        if(existingAdmin){
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123",10);

        await User.create({
            name:"Bank Admin",
            username:"admin",
            email:"admin@gmail.com",
            password:hashedPassword,
            role:"admin",
        });

        console.log("Admin created successfully");
        process.exit(1);
    }catch(error){
        console.log("Error:",error);
        process.exit(1);
    }
};

createAdmin();