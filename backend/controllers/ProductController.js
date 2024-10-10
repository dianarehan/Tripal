const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../cloudinary");

const Product = require("../models/Product.js");
const Rating = require("../models/Rating");
const Tourist = require("../models/users/Tourist.js");
const Seller = require("../models/users/Seller.js");

const createProduct = asyncHandler(async (req, res) => {
  const { name, sellerID, price, description, quantity, picture } = req.body;

  const seller = await Seller.findById(sellerID);
  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }
  let result;
  try {
    result = await cloudinary.uploader.upload(picture, {
      folder: "products",
    });
  } catch (error) {
    console.log(error.message);
  }

  const product = await Product.create({
    name,
    seller,
    price,
    description,
    quantity,
    picture: result.secure_url,
  });
  await product.save();
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("seller").populate({
    path: 'ratings',
    populate: {
      path: 'userID', // Populating the userID field
      select: 'userName' // Select only the userName field (or add more if needed)
    }
  });
  res.status(200).json(products);
});

const searchProductsByName = asyncHandler(async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400);
    throw new Error("name is required");
  }

  const products = await Product.find({
    name: { $regex: new RegExp(`${name}`, "i") }, //match name anywhere in string
  });

  res.status(200).json(products);
});

const filterProductsByPrice = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  if (!minPrice && !maxPrice) {
    res.status(400);
    throw new Error("At least one value should be provided");
  }

  const query = {};

  if (minPrice) {
    query.price = { ...query.price, $gte: minPrice };
  }

  if (maxPrice) {
    query.price = { ...query.price, $lte: maxPrice };
  }

  const products = await Product.find(query);
  res.status(200).json(products);
});

const sortProductsByRatings = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ averageRating: -1 });
  res.json(products);
});

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, picture, initialPicture } =
    req.body;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (
    !name &&
    !price &&
    !description &&
    !quantity &&
    !picture &&
    !initialPicture
  ) {
    res.status(400);
    throw new Error("At least one value should be provided");
  }
  let updatedProduct;
  if (picture) {
    let result;
    try {
      const oldPicturePublicId = product.picture
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      // Delete old picture
      await cloudinary.uploader.destroy(oldPicturePublicId);

      // Upload new picture
      result = await cloudinary.uploader.upload(picture, {
        folder: "products",
      });

      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description, quantity, picture: result.secure_url },
        { new: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  } else {
    updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, quantity },
      { new: true }
    );
  }

  res.status(200).json(updatedProduct);
});

const addRating = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, review, userID } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const tourist = await Tourist.findById(userID);
  if (!tourist) {
    res.status(404);
    throw new Error("User not found");
  }

  const newRating = new Rating({
    rating,
    review,
    userID,
  });

  await newRating.save();

  product.ratings.push(newRating._id);

  const ratings = product.ratings;
  const newAverage =
    product.averageRating * ((ratings.length - 1) / ratings.length) +
    rating / ratings.length;

  product.averageRating = newAverage;

  await product.save();

  res.status(201).json({
    message: "Rating added successfully",
    rating: newRating,
    newAverage: newAverage,
  });
});

module.exports = {
  createProduct,
  getProducts,
  searchProductsByName,
  filterProductsByPrice,
  sortProductsByRatings,
  editProduct,
  addRating,
};
