const express = require("express");
const router = express.Router();
const {registerUser, loginUser , getProfile , updateProfile} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploads");


router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile", protect , getProfile)
router.put("/update-profile", protect , upload.single("profilePic"),updateProfile);

module.exports = router;

