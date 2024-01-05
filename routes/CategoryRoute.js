const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory, updateCategory } = require('../controllers/CategoryController');





// add-category
router.post("/", addCategory);
// all-categories
router.get("/", getAllCategories);
// delete category
router.delete('/:id', deleteCategory);
// update category
router.put('/:id', updateCategory);


module.exports = router;

