const CryptoJS = require("crypto-js");
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
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SEC).toString();

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      password: encryptedPassword
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    resp.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    resp.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


const signin = async (req, resp)=>{
  try {
    // Retrieve data from request body
    const { email, password } = req.body;

    // Check if the user exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return resp.status(404).json({ message: 'User not found' });
    }
    
    const decryptedPassword = CryptoJS.AES.decrypt(existingUser.password, process.env.PASSWORD_SEC);
    const originalText = decryptedPassword.toString(CryptoJS.enc.Utf8);
    // console.log(originalText);

    // Check if the entered password matches the stored hashed password
    if (originalText !== password) {
      return resp.status(401).json({ message: 'Invalid password' });
    }
    // Password is valid - User successfully logged in

    // Exclude password field before sending the response
    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;


    resp.status(200).json({ message: 'User logged in successfully', user: userWithoutPassword });
  } catch (error) {
    resp.status(500).json({ message: 'Error logging in user', error: error.message });
  }

}

// Export the signup function
module.exports = { signup, signin };
