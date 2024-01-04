const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductDetails, deleteProduct, updareProduct } = require('../controllers/ProductController');




// add-product
router.post("/", addProduct);
// all-product
router.get("/", getAllProducts);
// product-details
router.get("/:id", getProductDetails);
// product-details
router.delete("/:id", deleteProduct);
// update-product
router.put("/:id", updareProduct);


module.exports = router;


