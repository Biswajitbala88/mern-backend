const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductDetails, deleteProduct, updareProduct } = require('./controllers/ProductController');




// add-product
router.post("/api/add-product", addProduct);
// all-product
router.get("/api/all-product", getAllProducts);
// product-details
router.get("/api/product-details/:id", getProductDetails);
// product-details
router.delete("/api/product-delete/:id", deleteProduct);
// update-product
router.put("/api/update-product/:id", updareProduct);


module.exports = router;


