const express = require('express');
const CartModel = require('../models/CartModel');


// create cart

const createCart = async (req, resp)=>{
    try{
        const product_id = req.params.id;
        const { user_id, quantity } = req.body;
        
        const newCart = new CartModel({
            user_id, product_id, quantity
        });
        const saveCart = await newCart.save();
        resp.status(200).json({ message: "Cart created successfully", cart: saveCart });
    } catch (error) {
      resp.status(500).json({ message: "Getting error while create cart", error: message.error });
    }
  
  }


module.exports = { createCart };
