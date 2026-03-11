const Notification = require("../models/Notification");

// GET all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// MARK all as read
exports.markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id },
      { isRead: true }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};