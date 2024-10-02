import express from 'express';
import Fragrance from '../models/Fragrance.js';

const router = express.Router();

// Create a fragrance
router.post('/', async (req, res) => {
    const { name, brand, description, price, category, imageUrl, stock } = req.body;
    try {
        const fragrance = new Fragrance({ name, brand, description, price, category, imageUrl, stock });
        await fragrance.save();
        res.status(201).json(fragrance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all fragrances
router.get('/', async (req, res) => {
    try {
        const fragrances = await Fragrance.find().populate('category');
        res.json(fragrances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:limit', async (req, res) => {
    try {
        const fragrances = await Fragrance.find().populate('category').limit(req.params.limit);
        res.json(fragrances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a fragrance
router.put('/:id', async (req, res) => {
    try {
        const fragrance = await Fragrance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(fragrance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a fragrance
router.delete('/:id', async (req, res) => {
    try {
        await Fragrance.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
