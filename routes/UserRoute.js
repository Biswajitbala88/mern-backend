const express = require('express');
const router = express.Router();
const { signup, signin, updateUser, getAllUser, userStats } = require('../controllers/UserController');



// signup
router.post("/api/signup", signup);

// signin
router.post("/api/signin", signin);

// update user
router.put("/api/update-user/:id", updateUser);

// get all user
router.get("/api/user", getAllUser);

// user stats
router.get("/api/user-stats", userStats);


module.exports = router;


