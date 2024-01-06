const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        reuired: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    }
},
{ timestamps: true }
);

const CartModel = mongoose.model('Cart', CartSchema);
module.exports = CartModel;

