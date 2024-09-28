const express = require('express');
const router = express.Router();
const {getProducts, createProduct, searchProductsByName} = require ('../controllers/ProductController');

router.get ('/products', getProducts);
router.post ('/products', createProduct);
router.get ('/products', searchProductsByName);

module.exports = router;