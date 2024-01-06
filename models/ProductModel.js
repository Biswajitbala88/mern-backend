const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

},
{ timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;

