const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header is required",
      });
    }


    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token is required",
      });
    }

    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Request is not authorized",
    });
  }
};

module.exports = requireAuth;