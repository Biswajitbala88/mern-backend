const express = require('express');
const router = express.Router();
const { createCart, getAllCart, cartStats } = require('../controllers/CartController');




// all-category
router.get("/", getAllCart);
// add-category
router.post("/:id", createCart);

// cart stats
router.get("/cart-stats", cartStats);

module.exports = router;



