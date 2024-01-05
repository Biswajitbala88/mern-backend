const express = require('express');
const router = express.Router();
const { createCart } = require('../controllers/CartController');





// add-category
router.post("/:id", createCart);

module.exports = router;



