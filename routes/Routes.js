const express = require('express');
const app = express();
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const CartController = require('../controllers/CartController');

const ProductRoute = require('./ProductRoute');
const CategoryRoute = require('./CategoryRoute');
const CartRoute = require('./CartRoute');

////////////// user routes /////////////////

// signup
router.post("/signup", UserController.signup);
// signin
router.post("/signin", UserController.signin);
// update user
router.put("/update-user/:id", UserController.updateUser);
// get all user
router.get("/all-user", UserController.getAllUser);
// user stats
router.get("/user-stats", UserController.userStats);


////////////// products routes /////////////////

// add-product
router.post("/create-product", ProductController.addProduct);
// all-product
router.get("/all-products", ProductController.getAllProducts);
// product-details
router.get("/product-details/:id", ProductController.getProductDetails);
// product-details
router.delete("/delete-product/:id", ProductController.deleteProduct);
// update-product
router.put("/update-product/:id", ProductController.updareProduct);
// user stats
router.get("/product-stats", ProductController.productStats);

////////////// category routes /////////////////

// add-category
router.post("/create-category", CategoryController.addCategory);
// all-categories
router.get("/all-categories", CategoryController.getAllCategories);
// delete category
router.delete('/delete-category/:id', CategoryController.deleteCategory);
// update category
router.put('/update-category/:id', CategoryController.updateCategory);


////////////// cart routes /////////////////

// all-cart
router.get("/all-cart", CartController.getAllCart);
// add-cart
router.post("/create-cart/:id", CartController.createCart);
// user-wise cart
router.post("/user-cart", CartController.getUserCart);
// update cart
router.post("/update-cart", CartController.updateCart);
// cart stats
router.get("/cart-stats", CartController.cartStats);







module.exports = router;