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

        const profilePicUrl = req.file
        ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
        : "";

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

//PROFILE
const getProfile = async (req,res) => {
    try{
        console.log("========== GET PROFILE CALLED ==========");
        console.log("req.user.id:", req.user.id);
        
        const user = await User.findById(req.user.id).select("-password");
        
        console.log("User found:");
        console.log("- name:", user.name);
        console.log("- email:", user.email);
        console.log("- profilePic:", user.profilePic);
        
        console.log("========== GET PROFILE COMPLETE ==========");
        
        res.json(user);
    }catch(error){
        console.error("GET PROFILE ERROR:", error);
        res.status(500).json({message: "Server Error"})
    }
};





// const getProfile = async (req,res) => {
//     try{
//         const user = await User.findById(req.user.id).select("-password");

//          console.log("Profile fetched:", user.profilePic ? "Has pic" : "No pic");

//         res.json(user);
//     }catch(error){
//         res.status(500).json({message: "Server Error"})
//     }
// };

//UpdateProfile
//UpdateProfile - WITH DETAILED LOGGING
const updateProfile = async (req,res) => {
    try{
        console.log("========== UPDATE PROFILE CALLED ==========");
        console.log("req.user._id:", req.user._id);
        console.log("req.file:", req.file ? {
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        } : "No file uploaded");
        
        // Log all body fields (excluding file)
        const bodyFields = {...req.body};
        console.log("req.body fields:", Object.keys(bodyFields));
        
        const user = await User.findById(req.user._id);
        
        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Current user in DB:");
        console.log("- name:", user.name);
        console.log("- email:", user.email);
        console.log("- profilePic:", user.profilePic);

        // Update fields
        if (req.body.name !== undefined) user.name = req.body.name;
        if (req.body.username !== undefined) user.username = req.body.username;
        if (req.body.email !== undefined) user.email = req.body.email;
        if (req.body.dob !== undefined) user.dob = req.body.dob;
        if (req.body.phone !== undefined) user.phone = req.body.phone;
        if (req.body.address !== undefined) user.address = req.body.address;
        if (req.body.age !== undefined) user.age = req.body.age;
        if (req.body.aadhar !== undefined) user.aadhar = req.body.aadhar;
        if (req.body.pan !== undefined) user.pan = req.body.pan;

        // Handle profile picture upload
        if (req.file) {
            // If new file uploaded, update it
            const newProfilePic = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
            console.log("Updating profilePic from:", user.profilePic);
            console.log("Updating profilePic to:", newProfilePic);
            user.profilePic = newProfilePic;
        } else {
            console.log("No new file uploaded, keeping existing profilePic:", user.profilePic);
        }

        console.log("Saving user...");
        await user.save();
        console.log("User saved successfully");

        // Fetch fresh from DB to verify
        const updatedUser = await User.findById(user._id).select("-password");
        console.log("Updated user from DB:");
        console.log("- name:", updatedUser.name);
        console.log("- email:", updatedUser.email);
        console.log("- profilePic:", updatedUser.profilePic);
        
        console.log("========== UPDATE COMPLETE ==========");

        res.json(updatedUser);

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
}




// const updateProfile = async (req,res) => {
//     try{
//         console.log("Update profile called");
//         console.log("req.file:", req.file ? "File uploaded" : "No file");
//         console.log("req.body:", Object.keys(req.body));

//         const user = await User.findById(req.user._id);

//         console.log("Current user profilePic:", user.profilePic);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.name = req.body.name || user.name;
//         user.username = req.body.username || user.username;
//         user.email = req.body.email || user.email;
//         user.dob = req.body.dob || user.dob;
//         user.phone = req.body.phone || user.phone;
//         user.address = req.body.address || user.address;
//         user.age = req.body.age || user.age;
//         user.aadhar = req.body.aadhar || user.aadhar;
//         user.pan = req.body.pan || user.pan;

//         if(req.file){
//             user.profilePic = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
//         }

//         await user.save();

//         const updatedUser = await User.findById(user._id).select("-password");

//         console.log("Updated user profilePic:", updatedUser.profilePic);

//         res.json(updatedUser)

//     }catch (error) {
//   console.error("UPDATE PROFILE ERROR:", error);
//   res.status(500).json({ message: error.message });
// }
// }

module.exports = {registerUser , loginUser , getProfile , updateProfile};