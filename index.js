const port = 1200;
const express = require('express');
require('./config/connection');
const { signup } = require('./controllers/UserController');

const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());




////////////// All routes /////////////////

// signup
app.post("/api/signup", signup);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})