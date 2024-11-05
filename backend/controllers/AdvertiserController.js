const advertiserModel = require("../models/users/Advertiser.js");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");

const createAdvertiser = async (req, res) => {
  try {
    const { userName, email, password, website, hotline, companyProfile } =
      req.body;
    // if (!userName || !password || !email) {
    //     return res.status(400).json({ error: "Missing required fields" });
    //   }
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingName = await advertiserModel.findOne({ userName });
    if (existingName) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const existingEmail = await advertiserModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const advertiser = await advertiserModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
      website,
      hotline,
      companyProfile,
    });
    const id = advertiser._id;
    // await userModel.create({
    //     userID: id,
    //     role: "Advertiser"
    // })
    res.status(201).json(advertiser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const readAdvertiser = async (req, res) => {
  try {
    const advertiser = await advertiserModel.findById(req.params.id);
    if (!advertiser) {
      return res.status(404).json({ error: "Advertiser not found" });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdvertiser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      website,
      hotline,
      companyProfile,
      existingImage,
      currentLogo, //new logo to be uploaded
    } = req.body;

    const existingAdvertiser = await advertiserModel.findById(req.params.id);
    if (!existingAdvertiser) {
      return res.status(404).json({ error: "Advertiser not found" });
    }

    let hashedPassword = existingAdvertiser.password; // Keep the current password if not updated
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateData = {
      userName,
      email,
      password: hashedPassword,
      website,
      hotline,
      companyProfile,
    };

    // Delete old logo if it exists
    if (existingImage) {
      try {
        const oldLogoPublicId = existingImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(oldLogoPublicId);
        updateData.companyProfile.logo = "";
      } catch (error) {
        return res.status(500).json({ error: "Failed to delete old logo" });
      }
    }

    if (currentLogo) {
      // Upload new logo
      try {
        const result = await cloudinary.uploader.upload(currentLogo, {
          folder: "companyLogos",
        });
        updateData.companyProfile.logo = result.secure_url;
      } catch (error) {
        console.error("Error uploading new logo:", error); // Log the error details
        return res
          .status(500)
          .json({ error: "Failed to upload new logo", details: error.message });
      }
    }

    const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // Options: return updated document, run validation
    );

    if (!updatedAdvertiser) {
      return res.status(404).json({ error: "Advertiser not found" });
    }

    return res.status(200).json({ status: "success", data: updatedAdvertiser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update advertiser" });
  }
};
module.exports = { createAdvertiser, readAdvertiser, updateAdvertiser };
