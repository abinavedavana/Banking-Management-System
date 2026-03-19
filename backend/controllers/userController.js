const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")

//REGISTER USER
const registerUser = async (req,res) => {
    try{
        const{name,
            username,
            email, 
            password,
            address,
            phone,
            age,
            dob,
            pan,
            aadhar,
        } = req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({message:"Required fields missing"});
        }

        const userExists = await User.findOne({
            $or:[ {email} , {username} ]
        });

        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }

        const profilePicUrl = req.file?.path || "";

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            username,
            email,
            password : hashedPassword,
            address,
            phone,
            age,
            dob,
            aadhar,
            pan,
            profilePic : profilePicUrl,
            accountNumber: Math.floor(100000000000 + Math.random() * 900000000000),
        });

        res.status(201).json({message:"User registered successfully",user:newUser});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


//LOGIN USER
const loginUser = async (req,res) => {
    try{
        const {identifier , password} = req.body;

        if(!identifier || !password){
            return res.status(400).json({message:"All fields required"});
        }

        //if user Exists
        const user = await User.findOne({
            $or:[
                {email:identifier},
                {username:identifier}
            ]
        });

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        //comapare pass
        const isMatch = bcrypt.compareSync(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //generate token
        const token = jwt.sign(
            { id: user._id , role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                balance : user.balance,
                profilePic:user.profilePic,
                accountNumber : user.accountNumber,
                bankName: "Horizon Bank",
                branch: "Calicut",
                ifsc: "HOR456723C6",
            },
        });

    } catch(error){
        res.status(500).json({message:error.message})
    }
};

//PROFILE
const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }
};

//UpdateProfile
const updateProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);

        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.dob = req.body.dob || user.dob;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.age = req.body.age || user.age;
        user.aadhar = req.body.aadhar || user.aadhar;
        user.pan = req.body.pan || user.pan;

        if(req.file){
            user.profilePic = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
        }

        await user.save();

        res.json({message:"Profile updated successfully"});

    }catch (error) {
  console.error("UPDATE PROFILE ERROR:", error);
  res.status(500).json({ message: error.message });
}
}

module.exports = {registerUser , loginUser , getProfile , updateProfile};