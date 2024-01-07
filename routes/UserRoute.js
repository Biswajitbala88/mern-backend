const express = require('express');
const router = express.Router();
const { signup, signin, updateUser } = require('../controllers/UserController');



// signup
router.post("/api/signup", signup);
// signin
router.post("/api/signin", signin);

router.put("/api/update-user/:id", updateUser);


module.exports = router;


