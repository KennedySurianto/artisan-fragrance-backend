import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from './models/User.js';
import Category from './models/Category.js';
import Fragrance from './models/Fragrance.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB (remove deprecated options)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Number of records to generate
const numUsers = 10;
const numCategories = 5;
const numFragrances = 20;
const numCarts = 10;
const numOrders = 10;
const numReviews = 30;

async function generateData() {
    try {
        // Clear previous data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Fragrance.deleteMany({});
        await Cart.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});

        // Generate users
        const users = [];
        for (let i = 0; i < numUsers; i++) {
            const user = new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement(['admin', 'customer']),
            });
            users.push(await user.save());
        }

        // Generate unique categories
        const uniqueCategories = new Set();
        while (uniqueCategories.size < numCategories) {
            const categoryName = faker.commerce.department();
            uniqueCategories.add(categoryName); // Ensure no duplicates
        }

        const categories = [];
        for (const categoryName of uniqueCategories) {
            const category = new Category({
                name: categoryName,
                description: faker.lorem.sentence(),
            });
            categories.push(await category.save());
        }

        // Generate fragrances
        const fragrances = [];
        for (let i = 0; i < numFragrances; i++) {
            const fragrance = new Fragrance({
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                brand: faker.company.name(),
                price: faker.commerce.price(50, 500),
                category: faker.helpers.arrayElement(categories)._id,
                // Updated to use a proper image generation function
                imageUrl: faker.image.url(),
                stock: faker.number.int({ min: 1, max: 100 }), // Updated
                scentNotes: faker.helpers.arrayElements(['Citrus', 'Floral', 'Woody', 'Fruity', 'Spicy'], 3),
            });
            fragrances.push(await fragrance.save());
        }

        // Generate carts
        for (let i = 0; i < numCarts; i++) {
            const cart = new Cart({
                userId: faker.helpers.arrayElement(users)._id,
                products: [
                    {
                        productId: faker.helpers.arrayElement(fragrances)._id,
                        quantity: faker.number.int({ min: 1, max: 5 }), // Updated
                    },
                ],
            });
            await cart.save();
        }

        // Generate orders
        for (let i = 0; i < numOrders; i++) {
            const order = new Order({
                userId: faker.helpers.arrayElement(users)._id,
                products: [
                    {
                        productId: faker.helpers.arrayElement(fragrances)._id,
                        quantity: faker.number.int({ min: 1, max: 5 }), // Updated
                    },
                ],
                totalAmount: faker.commerce.price(100, 1000),
                status: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered', 'Cancelled']),
            });
            await order.save();
        }

        // Generate reviews
        for (let i = 0; i < numReviews; i++) {
            const review = new Review({
                productId: faker.helpers.arrayElement(fragrances)._id,
                userId: faker.helpers.arrayElement(users)._id,
                rating: faker.number.int({ min: 1, max: 5 }), // Updated
                comment: faker.lorem.sentence(),
            });
            await review.save();
        }

        console.log('Dummy data generated successfully');
    } catch (err) {
        console.error('Error generating data:', err);
    } finally {
        mongoose.disconnect();
    }
}

generateData();
