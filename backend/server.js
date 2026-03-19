const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRouter = require("./routes/transactionRoutes");
const path = require("path");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://banking-management-system-nine.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/transactions",transactionRouter);
app.use("/api/notifications",notificationRoutes);
app.use("/api/admin",adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
})