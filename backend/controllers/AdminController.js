const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("../models/Admin.js");
const TourGuide = require("../models/TourGuide.js");
const Seller = require("../models/Seller.js");
const Advertiser = require("../models/Advertiser.js");
const Tourist = require("../models/Tourist.js");
const TourismGovernor = require("../models/TourismGovernor.js");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingName = await Admin.findOne({ username });
    if (existingName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
    const { id } = req.params; // Assuming you're passing id in the URL params like /deleteUser/:id
  
    try {
      let UserModel;
      
      // Define a function to find the user and determine which model to use
      async function findDocumentById(id) {
        let document;
  
        // document = await Admin.findById(id);
        // if (document) {
        //   return { document, userType: "Admin", model: Admin };
        // }
  
        document = await TourismGovernor.findById(id);
        if (document) {
          return { document, userType: "Tourism Governor", model: TourismGovernor };
        }
        
        document = await Advertiser.findById(id);
        if (document) {
          return { document, userType: "Advertiser", model: Advertiser };
        }

        document = await Seller.findById(id);
        if (document) {
          return { document, userType: "Seller", model: Seller };
        }

        document = await TourGuide.findById(id);
        if (document) {
          return { document, userType: "Tour Guide", model: TourGuide };
        }

        document = await Tourist.findById(id);
        if (document) {
          return { document, userType: "Tourist", model: Tourist };
        }
    
        return null; // If no user is found
      }
  
      const found = await findDocumentById(id);
  
      if (!found) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const { model, userType } = found;
  
      // Now delete the user
      const user = await model.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: `${userType} account deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user account", message: error.message });
    }
  };


  const getAllUsers = async (req, res) => {
    try {
      // Use Promise.all to fetch users from all collections concurrently
      const [admins, governors, sellers, tourGuides,advertisers,tourists] = await Promise.all([
        Admin.find({}), // Fetch all Admin users
        TourismGovernor.find({}), 
        Seller.find({}),
        TourGuide.find({}),
        Advertiser.find({}),
        Tourist.find({})

      ]);
  
      // Combine all user data into one array
      const allUsers = [
        // ...admins.map(user => ({ ...user._doc, userType: "Admin" })), 
        ...governors.map(user => ({ ...user._doc, userType: "Tourism Governor" })),
        ...sellers.map(user => ({ ...user._doc, userType: "Sellers" })),
        ...tourGuides.map(user => ({ ...user._doc, userType: "Tour Guides" })),
        ...advertisers.map(user => ({ ...user._doc, userType: "Advertisers" })),
        ...tourists.map(user => ({ ...user._doc, userType: "Tourists" })),
        
      ];
  
      // Return the combined user data
      res.status(200).json({ users: allUsers });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = { addAdmin,deleteUser,getAllUsers };
