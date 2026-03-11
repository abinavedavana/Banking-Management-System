const User = require("../models/User");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");
const Notification = require("../models/Notification");


//DEPOSIT
exports.depositMoney = async (req,res) => {
    try{
        const amount = Number(req.body.amount);

        if(!amount || amount <= 0){
            return res.status(400).json({message:"Invalid amount"});
        }

        const user = await User.findById(req.user.id);

        user.balance += amount;
        await user.save();

        const transaction = await Transaction.create({
            user: user._id,
            type:"Credit",
            amount,
            balanceAfter: user.balance,
        })

        res.json({message:"Deposit successful", balance:user.balance , transaction});

        await Notification.create({
          user: user._id,
          message:`₹${amount} Credited Successfully`
        })


    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
};


//WITHDRAW
exports.withdrawMoney = async (req,res) => {
    try{
        const amount = Number(req.body.amount); 

        if (!amount || amount <= 0){
            return res.status(400).json({message:"Invalid amount"});
        }

        const user = req.user;

        if(user.balance < amount){
            return res.status(400).json({message:"Insufficient balance"});
        }

        user.balance -= amount;
        await user.save();

        const transaction = await Transaction.create({
            user: user._id,
            type:"Withdraw",
            amount,
            balanceAfter: user.balance,
        })

        await Notification.create({
          user: user._id,
          message:`₹${amount} Debited Successfully`
        })

        res.json({message:"Withdrawal successful", balance:user.balance , transaction});

    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};


//TRANSFER
exports.transferMoney = async (req, res) => {
  try {
    const senderId = req.user._id;
    const amount = Number(req.body.amount);
    const { accountNumber } = req.body;

    if (!accountNumber || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer data" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ accountNumber });

    if (!receiver) {
      return res.status(400).json({ message: "Receiver not found" });
    }

    if (sender.accountNumber === receiver.accountNumber) {
      return res.status(400).json({ message: "Cannot transfer to your own account" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Debit sender
    sender.balance -= amount;
    await sender.save();

    // Credit receiver
    receiver.balance += amount;
    await receiver.save();

    // Sender transaction
    await Transaction.create({
      user: sender._id,
      type: "Transfer",
      amount,
      balanceAfter: sender.balance,
      fromAccount: sender.accountNumber,
      toAccount: receiver.accountNumber,
    });

    // Receiver transaction
    await Transaction.create({
      user: receiver._id,
      type: "Received",
      amount,
      balanceAfter: receiver.balance,
      fromAccount: sender.accountNumber,
      toAccount: receiver.accountNumber,
    });

    //notification for sender
    await Notification.create({
      user: sender._id,
      message:`₹${amount} transferred to ${receiver.accountNumber}`,
    })

    //notification for receiver
    await Notification.create({
      user : receiver._id,
      message:`₹${amount} received from ${sender.accountNumber}`,
    })

    res.json({
      message: "Transfer successful",
      balance: sender.balance,
    });


  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//HISTORY
exports.getTransactionHistory = async (req,res) => {
    try{
        const transactions = await Transaction.find({user: req.user.id})
        .sort({createdAt: -1});
        
        res.json(transactions);

    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};