// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure that the name is required
        unique: true,   // Make sure each category name is unique
    }, // e.g., "Floral", "Woody", "Fruity"
    description: {
        type: String,
        required: true, // Ensure that the description is also required
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Category = mongoose.model('Category', categorySchema);
export default Category;
