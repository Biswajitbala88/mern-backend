const express = require('express');
const router = express.Router();
const { signup, signin } = require('./controllers/UserController');



// signup
router.post("/api/signup", signup);
// signin
router.post("/api/signin", signin);


module.exports = router;


