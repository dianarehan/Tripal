const productModel = require('../models/Product.js');
const { default: mongoose } = require('mongoose');

const createProduct = async(req,res) => {
   const {name, sellerID, price, description, quantity, picture} = req.body;

   if (!name || !sellerID || !price || !description || !quantity || !picture) {
      return res.status(400).json({ error: 'All fields are required' });
   }
   if (!mongoose.Types.ObjectId.isValid(sellerID)) {
      return res.status(400).json({ error: 'Invalid sellerID' });
    }
   try{
      const product = await productModel.create({name, sellerID, price, description, quantity, picture})
      res.status(200).json(product);
   }
   catch(error){
      res.status(400).json({error: error.message});
   }
}

const getProducts = async (req, res) => {
   try{
      const allProducts = await productModel.find()
      res.status(200).json(allProducts);
  }
  catch(error){
   res.status(400).json({error: error.message});
  }
}

const searchProductsByName = async (req, res) => {
   const { name } = req.query;
    if (!name) {
     return res.status(400).json({ error: 'Product name is required' });
   }

   try {
      const products = await productModel.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
 
     if (products.length === 0) {
       return res.status(404).json({ message: 'No products found' });
     }
 
     res.status(200).json(products);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 };

module.exports = {createProduct, getProducts, searchProductsByName};
