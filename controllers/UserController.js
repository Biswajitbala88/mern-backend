const express = require('express');
const UserModel = require('../models/UserModel');


// Define signup function
const signup = async (req, resp) => {
  try {
    // Retrieve data from request body
    const { name, email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    resp.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    resp.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Export the signup function
module.exports = { signup };
