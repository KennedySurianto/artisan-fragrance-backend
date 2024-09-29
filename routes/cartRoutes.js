import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Create a cart
router.post('/', async (req, res) => {
    const { userId, items } = req.body;
    try {
        const cart = new Cart({ userId, items });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get cart for a user
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart
router.put('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete cart
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
