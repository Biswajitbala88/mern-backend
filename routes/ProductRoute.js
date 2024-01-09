const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductDetails, deleteProduct, updareProduct, productStats } = require('../controllers/ProductController');




// add-product
router.post("/", addProduct);
// all-product
router.get("/", getAllProducts);
// product-details
router.get("/details/:id", getProductDetails);
// product-details
router.delete("/:id", deleteProduct);
// update-product
router.put("/:id", updareProduct);
// user stats
router.get("/product-stats", productStats);




module.exports = router;


