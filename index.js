// DB connection
require("dotenv").config();
const mongoDbUrl = process.env.MONGO_URL;
const connectDB = require("./config/connection");
connectDB(mongoDbUrl);
const port = process.env.PORT || 1500;

const express = require('express');
const Routes = require('./routes/Routes');

const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

////////////// routes /////////////////
app.use("/api", Routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})