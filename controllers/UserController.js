const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const express = require('express');
const UserModel = require('../models/UserModel');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../routes/verifyToken');

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

    const accessToken = jwt.sign({
      id: userWithoutPassword._id,
      isAdmin: userWithoutPassword.isAdmin
    }, process.env.JWT_SEC, {expiresIn: "3d"});

    resp.status(200).json({ message: 'User logged in successfully', user: { ...userWithoutPassword, accessToken: accessToken } });
  } catch (error) {
    resp.status(500).json({ message: 'Error logging in user', error: error.message });
  }

}

// update user
const updateUser = async (req, resp)=>{
  try{
    verifyTokenAndAuthorization(req, resp, async () => {
      const getId = req.params.id;
      const updateData = req.body;

      // Update the category in the database
      const updateUser = await UserModel.findByIdAndUpdate(
        getId,
        updateData,
        { new: true } // To return the updated document
      );
      if(!updateUser){
        resp.status(400).json({ message: "User not found" });
      }
      resp.status(200).json({ message: "User update successfully", user: updateUser });
      
    });
    
  } catch (error) {
    resp.status(500).json({ message: "Getting error while User update", error: message.error });
  }
}

// get all user
const getAllUser = async (req, resp) => {
  try {
    verifyTokenAndAdmin(req, resp, async () => {
      const allUser = await UserModel.find();
      if (allUser.length > 0) {
        resp.status(200).json({ message: "Users found successfully", users: allUser });
      } else {
        resp.status(404).json({ message: "Users not found" });
      }
    });
  } catch (error) {
    resp.status(500).json({ message: "Error retrieving all users", error: error.message });
  }
};






// Export the signup function
module.exports = { signup, signin, updateUser, getAllUser };
