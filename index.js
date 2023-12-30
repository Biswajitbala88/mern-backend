const express = require('express');
const app = express();
const port = 1200;

const { getUser, getUserDetails } = require('./controllers/user');




app.get("/", getUser);
app.get("/getUserDetails", getUserDetails);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})