const Seller = require("../models/users/Seller.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../cloudinary");

const createSeller = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const existingName = await Seller.findOne({ userName });
  if (existingName) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const existingEmail = await Seller.findOne({ email });
  if (existingEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const sellernew = await Seller.create({
    userName: userName,
    email: email,
    password: hashedPassword,
  });
  // const id = sellernew._id
  // await userModel.create({
  //     userID: id,
  //     role: "Seller"
  // })
  res.status(201).json(sellernew);
});

const readSellerData = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }

  res.status(200).json({ status: "success", data: seller });
});

const updateSellerData = asyncHandler(async (req, res) => {
  const { name, description, logo, initialLogo } = req.body;
  let result;

  // Delete old logo if provided
  if (initialLogo) {
    try {
      const oldPicturePublicId = initialLogo
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      // Delete old picture
      await cloudinary.uploader.destroy(oldPicturePublicId);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete old logo" });
    }
  }

  // Check if new logo is provided for upload
  if (logo) {
    try {
      result = await cloudinary.uploader.upload(logo, {
        folder: "sellerLogos",
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to upload new logo" });
    }
  }

  const updateData = {
    name,
    description,
  };

  if (result && result.secure_url) {
    updateData.logo = result.secure_url;
  } else {
    updateData.logo = "";
  }

  const updatedSeller = await Seller.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true } // Options: return updated document, run validation
  );

  if (!updatedSeller) {
    return res.status(404).json({ error: "Seller not found" });
  }

  res.status(200).json({ status: "success", data: updatedSeller });
});

module.exports = { createSeller, readSellerData, updateSellerData };
