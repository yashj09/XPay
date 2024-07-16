const express = require("express");
const router = express.Router();
const Account = require("../Models/accountModel");
const authMiddleware = require("../Middleware/authMiddleware");
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId })

  if (!account || account.balance < amount) { 
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to })
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  )
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  )


  res.json({
    message: "Transfer successful",
  });
});
module.exports = router;
