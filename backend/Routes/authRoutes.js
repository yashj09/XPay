const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { JWT_SECRET, JWT_EXPIRY } = require("../Config/config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/authMiddleware");
const zod = require("zod");
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username already exist" });
    }
    const user = new User({ username, password, firstName, lastName });
    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("we got error", error);
    next(error);
  }
});
router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256",
    });
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const parseResult = updateBody.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Error while updating information",
      errors: parseResult.error.errors,
    });
  }

  const updateData = parseResult.data;

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

//filter user based on name 
router.get('/bulk', async (req,res)=>{
const filter=req.query.filter||""
const users=await User.find({
  $or:[
    {
      firstName:{'$regex':filter}
    },
    {
      lastName:{'$regex':filter}
    }
  ]
})

res.json({
  user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
  }))
})
})



module.exports = router;
