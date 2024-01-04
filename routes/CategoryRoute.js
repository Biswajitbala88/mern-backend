const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory } = require('../controllers/CategoryController');





// add-category
router.post("/", addCategory);
// all-categories
router.get("/", getAllCategories);
router.delete('/:id', deleteCategory);


module.exports = router;


