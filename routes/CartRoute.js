const express = require('express');
const router = express.Router();
const { createCart, getAllCart } = require('../controllers/CartController');




// all-category
router.get("/", getAllCart);
// add-category
router.post("/:id", createCart);

module.exports = router;



