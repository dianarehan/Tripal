const touristModel = require("../models/Tourist");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require('../models/User.js')



const createTourist = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { userName, email, password, mobileNumber, nationality, dateOfBirth, job } = req.body;

    // Check unique username across all users
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check unique email across all users
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Validate required fields
    if (!userName || !email || !password || !mobileNumber || !nationality || !dateOfBirth || !job) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    // Create tourist
    const tourist = await touristModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      mobileNumber: req.body.mobileNumber,
      nationality: req.body.nationality,
      dateOfBirth: req.body.dateOfBirth,
      job: req.body.job,
      wallet: {
        amount: 0,
        currency: "EGP"
      }
    });

    const id = tourist._id;

    // Create associated user role
    await userModel.create({
      userID: id,
      role: "tourist",
    });

    return res.status(201).json(tourist);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



const getTouristInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // checks if the id is a valid one
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid tourist ID",
      });
    }

    // retreives all the info beta3 el tourist by his id
    const touristInformation = await touristModel.findById(id).lean();
    if (!touristInformation) {
      return res.status(404).json("Tourist profile doesn't exist");
    }
    // find corresponding wallet for this user (by default created with a balance of 0)
    const touristWallet = await walletModel.findOne({ userID: id });
    let walletBalance = "No wallet information available";

    if (touristWallet) {
      walletBalance = `${touristWallet.amount} ${touristWallet.currency}`;
    }

    touristInformation.walletBalance = walletBalance;

    return res.status(200).json(touristInformation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateTouristProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...updateParameters } = req.body;

    if (updateParameters.userName) {
      res.status(400).json({
        status: "error",
        message: "You cannot update your username",
      });
    }
    if (updateParameters.walletBalance) {
      res.status(400).json({
        status: "error",
        message: "You cannot update your balance",
      });
    }
    if (updateParameters.dateOfBirth) {
      res.status(400).json({
        status: "error",
        message:
          "You cannot update your date of birth, dont you know when you were born??",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid tourist ID",
      });
    }
    const touristToBeUpdated = await touristModel.findByIdAndUpdate(
      id,
      updateParameters,
      { new: true }
    );
    console.log(touristToBeUpdated);
    if (!touristToBeUpdated) {
      return res.status(404).json("Tourist profile doesnt exist");
    }

    return res
      .status(200)
      .json(touristToBeUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createTourist, getTouristInfo, updateTouristProfile };
