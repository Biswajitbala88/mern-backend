const express = require('express');
const CartModel = require('../models/CartModel');


// create cart

module.exports.createCart = async (req, resp)=>{
  try{
      const product_id = req.params.id;
      const { user_id, quantity } = req.body;
      let cart = await CartModel.findOne({ user_id });
      if(cart){
        const existingItem = cart.items.find(item => item.product_id === product_id);
        if (existingItem) {
            existingItem.quantity = quantity || 0;
        } else {
            // If the product is not in the cart, add it
            cart.items.push({ product_id, quantity });
        }
        const saveCart = await cart.save();
        resp.status(200).json({ message: "Cart created successfully", cart: saveCart });
      }else{
        const newCart = new CartModel({
          user_id, items: [{ product_id, quantity }]
        });
        const saveCart = await newCart.save();
        resp.status(200).json({ message: "Cart updated successfully", cart: saveCart });
      }
  } catch (error) {
    resp.status(500).json({ message: "Getting error while create cart", error: message.error });
  }
}


// update cart
module.exports.updateCart = async (req, resp) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    // Find the cart based on user_id
    let cart = await CartModel.findOne({ user_id });
    // If the cart does not exist, create a new one
    if (!cart) {
      cart = new CartModel({ user_id, items: [] });
    }
    // Find the index of the product in the cart
    const productIndex = cart.items.findIndex(item => item.product_id === product_id);
    cart.items[productIndex].quantity = quantity;
    // Save the updated cart
    await cart.save();

    resp.status(200).json({ message: "Cart update successful", cart: cart });
  } catch (error) {
    resp.status(500).json({ message: "Error updating cart", error: error });
  }
};




// get all cart
module.exports.getAllCart = async (req, resp)=>{
try{
  const carts = await CartModel.find({});
  if(carts.length>0){
    resp.status(200).json({ message: "Cart found successsfully", cart: carts });
  }else{
    resp.status(400).json({ message: "No cart found" });
  }
} catch (error) {
  resp.status(500).json({ message: "Error getting all cart", error: message.error });
}
}

// get user wise cart
module.exports.getUserCart = async (req, resp)=>{
try{
    const user_id = req.body.user_id;
    const cart = await CartModel.findOne({user_id});
    // const productIds = cart.items.map(item => item.product_id);
    resp.status(200).json({ message: "user cart found", cart: cart });
  } catch (error) {
    resp.status(500).json({ message: "error getting user cart", error: error });
  }
}

// get cart stats
module.exports.cartStats = async (req, resp) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await CartModel.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        }
      },
      {
        $group: {
          _id: { $concat: [{ $toString: "$month" }, "-", { $toString: "$year" }] },
          total: { $sum: 1 },
        }
      }
    ]).exec();

    resp.status(200).json({ message: "Cart stats found", stats: data });
  } catch (error) {
    resp.status(500).json({ message: "Error getting user stats", error: error });
  }
}


// module.exports = { createCart, getAllCart, cartStats, getUserCart, updateCart };
