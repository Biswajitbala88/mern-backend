const express = require('express');

// Define getUser function
const getUser = async (req, res) => {
    res.send("Get User");
};

// Define getUserDetails function
const getUserDetails = async (req, res) => {
    res.send("Get User Details");
};

module.exports = { getUser, getUserDetails };