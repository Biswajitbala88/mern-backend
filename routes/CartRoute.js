const express = require('express');
const router = express.Router();
const { createCart, getAllCart, cartStats, getUserCart, updateCart } = require('../controllers/CartController');




// all-category
router.get("/all-cart", getAllCart);
// add-category
router.post("/create-cart/:id", createCart);
// user-wise cart
router.post("/user-cart", getUserCart);
// update cart
router.post("/update-cart", updateCart);



// cart stats
router.get("/cart-stats", cartStats);

module.exports = router;



