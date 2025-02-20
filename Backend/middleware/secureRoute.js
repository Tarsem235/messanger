const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    
    // Proceed if the token is valid
    const user = await User.findById(verified.userId).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();

  } catch (error) {
    console.error("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = secureRoute;
