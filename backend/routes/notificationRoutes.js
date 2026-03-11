const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const {protect} = require("../middleware/authMiddleware");

//GET all Notification
router.get("/",protect , async(req,res) => {
    const notifications = await Notification.find({
        user:req.user._id,
    }).sort({createdAt: -1});

    res.json(notifications);
});

//Mark all as read
router.put("/mark-read", protect , async(req,res) => {
    await Notification.updateMany(
        {user:req.user._id},
        {isRead : true}
    );
    res.json({message:"Marked as read"});
});

module.exports = router;