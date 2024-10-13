const bcrypt = require("bcrypt");
const Admin = require("../models/users/Admin.js");
const TourGuide = require("../models/users/TourGuide.js");
const Seller = require("../models/users/Seller.js");
const Advertiser = require("../models/users/Advertiser.js");
const Tourist = require("../models/users/Tourist.js");
const TourismGovernor = require("../models/users/TourismGovernor.js");
const User = require("../models/users/User.js");
const Request = require('../models/Request.js')

const addAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: "Missing required fields: username and password" });
    }

    //check unique userName across all users
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingUserNameRequests = await Request.findOne({
      userName,
      status: { $ne: 'rejected' }
    });
    if (existingUserNameRequests) {
      return res.status(400).json({ error: "Request has been submitted with this username" });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      userName: req.body.userName,
      password: hashedPassword,
    });

    await User.create({
      userId: newAdmin._id,
      userName: newAdmin.userName,
      role: "Admin"
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
  console.log("I came here")
  const { id } = req.params; // Assuming you're passing id in the URL params like /deleteUser/:id

  try {
    const correspondingUser = await User.find({ userId: id }) // Ensure to await the promise

    console.log("I deleted from user", correspondingUser)
    if (!correspondingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = correspondingUser[0].role;
    console.log("Role is", role);
    switch (role) {
      case "Tour Guide":
        await TourGuide.findByIdAndDelete(id)
        break;
      case "Advertiser":
        await Advertiser.findByIdAndDelete(id)
        break;
      case "Seller":
        await Seller.findByIdAndDelete(id)
        break;
      case "Tourist":
        await Tourist.findByIdAndDelete(id)
        break;
      case "Tourism Governor":
        await TourismGovernor.findByIdAndDelete(id)
        break;
      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    // Proceed with deleting the user
    await User.deleteOne({ userId: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { addAdmin, deleteUser, getAllUsers };
