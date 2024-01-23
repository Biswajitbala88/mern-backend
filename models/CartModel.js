const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        reuired: true,
    },
    items: [
        {
            product_id: { type: String, required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
},
{ timestamps: true }
);

const CartModel = mongoose.model('Cart', CartSchema);
module.exports = CartModel;

