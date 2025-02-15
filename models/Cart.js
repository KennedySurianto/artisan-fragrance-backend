// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Assuming you have a Product model
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
