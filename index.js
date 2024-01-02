const port = 1200;

// DB connection
const mongoDbUrl = "mongodb://localhost:27017/mern";
const connectDB = require("./config/connection");
connectDB(mongoDbUrl);

const express = require('express');
const { signup, signin } = require('./controllers/UserController');
const { addProduct, getAllProducts, getProductDetails, deleteProduct, updareProduct } = require('./controllers/ProductController');

const { addCategory, getAllCategories } = require('./controllers/CategoryController');

const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());







////////////// All routes /////////////////

// signup
app.post("/api/signup", signup);
// signin
app.post("/api/signin", signin);

// add-product
app.post("/api/add-product", addProduct);
// all-product
app.get("/api/all-product", getAllProducts);
// product-details
app.get("/api/product-details/:id", getProductDetails);
// product-details
app.delete("/api/product-delete/:id", deleteProduct);
// update-product
app.put("/api/update-product/:id", updareProduct);


// add-category
app.post("/api/add-category", addCategory);
// all-categories
app.get("/api/all-categories", getAllCategories);






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})