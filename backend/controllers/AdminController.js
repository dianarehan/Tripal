const TourismGovernor = require("../models/TourismGovernor.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("../models/Admin.js");

const addTourismGovernor = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if username already exists
    const existingName = await TourismGovernor.findOne({ username });
    if (existingName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await TourismGovernor.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTourismGovernor = await TourismGovernor.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    res.status(200).json(newTourismGovernor);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addAdmin = async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if username already exists
      const existingName = await Admin.findOne({ username });
      if (existingName) {
        return res.status(400).json({ error: "Username already exists" });
      }
  
      const existingEmail = await Admin.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = await Admin.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      res.status(200).json(newAdmin);
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {addTourismGovernor,addAdmin};
