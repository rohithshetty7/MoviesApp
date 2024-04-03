const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/recommendations', movieController.getRecommendations);

module.exports = router;
