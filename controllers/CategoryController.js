const express = require('express');
const CategoryModel = require('../models/CategoryModel');

// create category 
const addCategory = async (req, resp)=>{
  try{
    // get request data
    const { name, description } = req.body;
    // get existing category
    const existingCategory = await CategoryModel.findOne({ name });
    // console.log(existingCategory);
    if(!existingCategory){
      const newCategory = new CategoryModel({
        name, description
      });
      const saveCategory = await newCategory.save();
      resp.status(200).json({ message: "Category created successfully", category: saveCategory });
    }else{
      resp.status(400).json({ message: "Same category already exist" });
    }

  } catch (error) {
    resp.status(500).json({ message: "Error creating category", error: message.error });
  }
}

// get all category
const getAllCategories = async (req, resp)=>{
  try{
    const categories = await CategoryModel.find({});
    if(categories.length>0){
      resp.status(200).json({ message: "Categories found successsfully", categories: categories });
    }else{
      resp.status(400).json({ message: "No category found" });
    }
  } catch (error) {
    resp.status(500).json({ message: "Error getting all categories", error: message.error });
  }
}




module.exports = { addCategory, getAllCategories };
