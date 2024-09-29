// models/Fragrance.js
import mongoose from 'mongoose';

const fragranceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    imageUrl: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    scentNotes: [{
        type: String
    }],
}, { timestamps: true });

const Fragrance = mongoose.model('Fragrance', fragranceSchema);
export default Fragrance;
