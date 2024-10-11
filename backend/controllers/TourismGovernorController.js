const bcrypt = require("bcrypt");
const TourismGovernor = require("../models/users/TourismGovernor.js");
const User = require('../models/users/User.js')
const Request = require('../models/Request.js')

const addTourismGovernor = async (req, res) => {
  try {
    const { userName, password } = req.body;


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
    console.log("data", userName, password)
    if (!userName || !password) {
      return res.status(400).json({ error: "Missing required fields: username and password" });
    }




    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTourismGovernor = await TourismGovernor.create({
      userName: req.body.userName,
      password: hashedPassword,
    });

    const id = newTourismGovernor._id
    await User.create({
      userId: id,
      userName: newTourismGovernor.userName,
      role: "Tourism Governor"
    })
    res.status(201).json(newTourismGovernor);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTourismGovernors = async (req, res) => {
  try {
    const governor = await TourismGovernor.find();
    if (governor.length === 0) {
      return res.status(400).json('No governors found');
    }

    res.status(200).json(governor);
  }
  catch (error) {
    res.status(404).json('Error fetching all governors', error);
  }
}


module.exports = { addTourismGovernor, getTourismGovernors };
