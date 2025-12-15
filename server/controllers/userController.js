import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10); // Generate encrypt password
    const hashedPassword = await bcrypt.hash(password, salt); // encrypt password

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token: token,
      message: "Account created successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.json({ success: false, message: "missing details" });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      res.json({ success: false, message: "User not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    res.json({
      success: true,
      userData,
      token,
      message: "User login successful",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res)=>{
    res.json({success : true, user : req.user})
};


// Controller to update user profile details
export const updateProfile = async (req, res)=> {
    try{
        const {profilePic, bio, fullName} = req.body;  // get this data from request body.

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new : true});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic : upload.secure_url, bio, fullName}, {new : true});
        }

        res.json({success : true, user: updatedUser})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

