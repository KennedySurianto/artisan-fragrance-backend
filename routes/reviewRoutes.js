import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Create a review
router.post('/', async (req, res) => {
    const { fragranceId, userId, rating, comment } = req.body;
    try {
        const review = new Review({ fragranceId, userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all reviews for a fragrance
router.get('/:fragranceId', async (req, res) => {
    try {
        const reviews = await Review.find({ fragranceId: req.params.fragranceId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a review
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
