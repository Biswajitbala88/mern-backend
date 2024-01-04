const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories } = require('../controllers/CategoryController');





// add-category
router.post("/", addCategory);
// all-categories
router.get("/", getAllCategories);



module.exports = router;


