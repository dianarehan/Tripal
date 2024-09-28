const express = require('express');
const router = express.Router();
const {getProducts, createProduct, searchProductsByName} = require ('../controllers/ProductController');

router.get ('/', getProducts);
router.post ('/create', createProduct);
router.get ('/search', searchProductsByName);

module.exports = router;