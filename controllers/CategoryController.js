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

// update category
const updateCategory = async (req, resp)=>{
  try{
    const getId = req.params.id;
    const updateData = req.body;

    // Update the category in the database
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      getId,
      updateData,
      { new: true } // To return the updated document
    );
    if(!updateCategory){
      resp.status(400).json({ message: "category not found" });
    }
    resp.status(200).json({ message: "category update successfully", category: updateCategory });
  } catch (error) {
    resp.status(500).json({ message: "Getting error while category update", error: message.error });
  }

}

// delete category
const deleteCategory = async (req, resp)=>{
  try{
    const getId = req.params.id;
    const getDeleteInfo = await CategoryModel.deleteOne({ _id: getId });
    if(getDeleteInfo.deletedCount === 0){
      resp.status(400).json({ message: "category not found" });
    }
    resp.status(200).json({ message: "category Deleted", category: getDeleteInfo});
  } catch (error) {
    resp.status(500).json({ message: "Getting Error while category deleing", error: message.error });
  }
}




module.exports = { addCategory, getAllCategories, deleteCategory, updateCategory };
