const router = require('express').Router();
const { getReviews, createReviews, updateReviews, deleteReviews } = require('../controller/reviewController');

router.get('/', getReviews);

router.post('/', createReviews);

router.patch('/:id', updateReviews)

router.delete('/:id',deleteReviews);

module.exports= router;