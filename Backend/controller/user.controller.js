const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const createTokenAndSaveCookie = require("../jwt/generateToken.js");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // Check if confirm password matches password
    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,  
    });

    await newUser.save();
if (newUser) {
  createTokenAndSaveCookie(newUser._id , res);
    res.status(201).json({ message: 'User registered successfully' });
  }
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log("Received email:", email);
    console.log("Received password:", password);

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid user or password" });
        }

        console.log("User found:", user);

        // Ensure `user.password` is defined
        if (!user.password) {
            return res.status(500).json({ message: "User password is missing in database" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user or password" });
        }

        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = async(req,res)=>{
  try{
res.clearCookie('jwt');
res.status(200).json({message:"Logout Sucessfully"})
  }catch(err){
    console.error( err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Get the logged-in user's ID from req.user (set by secureRoute middleware)
    const loggedInUser = req.user._id;

    // Find all users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: loggedInUser } }) // Exclude logged-in user
      .select("-password -confirmpassword"); // Exclude password and confirm password

    // Return the list of users excluding the logged-in user
    res.status(200).json(allUsers);
  } catch (err) {
    console.log("Error in getUserProfile: " + err); // Log the error for debugging
    res.status(500).json({ message: "Server Error" }); // Send a generic error message
  }
};

