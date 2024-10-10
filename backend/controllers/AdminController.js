const bcrypt = require("bcrypt");
const Admin = require("../models/users/Admin.js");
const TourGuide = require("../models/users/TourGuide.js");
const Seller = require("../models/users/Seller.js");
const Advertiser = require("../models/users/Advertiser.js");
const Tourist = require("../models/users/Tourist.js");
const TourismGovernor = require("../models/users/TourismGovernor.js");
const User = require("../models/users/User.js");

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
  const { id } = req.params; // Assuming you're passing id in the URL params like /deleteUser/:id

  try {

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
      return res.status(400).json({ error: "User1 not found" });
    }

    const { model, userType } = found;

    // Now delete the user
    const user = await model.findById(id);
    const user2 = await User.findOne({ userID: id });

    if (!user || !user2) {
      return res.status(400).json({ error: "User1 not found" });
    }
    else {
      const x = await model.findByIdAndDelete(id);
      const y = await User.deleteOne({ userID: id });
      if (!x) {
        return res.status(404).json({ error: "Error deleting from DocumentModel" });

      }
      if (!y) {
        return res.status(404).json({ error: "Error deleting from UserModel" });
      }
    }



    res.status(200).json({ message: `${userType} account deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user account", message: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    // Use Promise.all to fetch users from all collections concurrently
    const [admins, governors, sellers, tourGuides, advertisers, tourists] = await Promise.all([
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { addAdmin, deleteUser, getAllUsers };
