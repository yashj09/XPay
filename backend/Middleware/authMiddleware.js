const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { JWT_SECRET } = require("../Config/config");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    const user = await User.findById(decode.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Please authenticate",
    });
  }
};

module.exports = authMiddleware;
