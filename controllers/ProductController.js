const ProductModel = require('../models/ProductModel');


// create product
const addProduct = async (req, resp)=>{
  try{
    const {name, price, category, image, description} = req.body;
    // console.log(req.body);

    // check existing product
    const existingProduct = await ProductModel.findOne({ name});

    if(!existingProduct){
      // Create a new product instance
      const newProduct = new ProductModel({
        name,
        price,
        category,
        image,
        description
      });

      const saveProduct = await newProduct.save();
      resp.status(201).json({ message: 'Product created successfully', product: saveProduct });
    }else{
      return resp.status(400).json({ message: 'Product already exists' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Error creating new product', error: error.message });
  }
}

// get all product
const getAllProducts = async (req, resp)=>{
  try{
    const products = await ProductModel.find({});
    if(products.length>0){
      resp.status(200).json({ message: 'Product found successfully', product: products });
    }else{
      resp.status(400).json({ message: 'No product found' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Error getting all products', error: message.error });
  }
}

// get product details 
const getProductDetails = async (req, resp)=>{
  try{
    const getId = req.params.id;
    const productInfo = await ProductModel.findOne({_id: getId});
    if(!productInfo){
      resp.status(400).json({ message: "Product not found" });
    }
    resp.status(200).json({ message: "Getting product details", product: productInfo });
  } catch (error) {
    resp.status(500).json({ message: "Error getting product details", error: message.error });
  }
}


// delete product
const deleteProduct = async (req, resp)=>{
  try{
    const getId = req.params.id;
    const getDeleteInfo = await ProductModel.deleteOne({ _id: getId });
    if(getDeleteInfo.deletedCount === 0){
      resp.status(400).json({ message: "Product not found" });
    }
    resp.status(200).json({ message: "Product Deleted", product: getDeleteInfo});
  } catch (error) {
    resp.status(500).json({ message: "Getting Error while product deleing", error: message.error });
  }
}

// update product
const updareProduct = async (req, resp)=>{
  try{
    const getId = req.params.id;
    const updateData = req.body;

    // Update the product in the database
    const updateProduct = await ProductModel.findByIdAndUpdate(
      getId,
      updateData,
      { new: true } // To return the updated document
    );
    if(!updateProduct){
      resp.status(400).json({ message: "Product not found" });
    }
    resp.status(200).json({ message: "Product update successfully", product: updateProduct });
  } catch (error) {
    resp.status(500).json({ message: "Getting error while product update", error: message.error });
  }

}

// Export the signup function
module.exports = { addProduct, getAllProducts, getProductDetails, deleteProduct, updareProduct };
