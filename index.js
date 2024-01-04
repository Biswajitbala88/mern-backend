const port = 1200;

// DB connection
const mongoDbUrl = "mongodb://localhost:27017/mern";
const connectDB = require("./config/connection");
connectDB(mongoDbUrl);

const express = require('express');

const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute');
const CategoryRoute = require('./routes/CategoryRoute');



const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());







////////////// All routes /////////////////


app.use('/', UserRoute);
app.use('/product/', ProductRoute);
app.use('/category/', CategoryRoute);








app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})