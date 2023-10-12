const express = require('express');
const Auto = require('../../models/auto'); // Adjust the path based on your project structure
const router = express.Router();

// Route to get all autos
router.get('/suggest-autos', async (req, res) => {
  try {
    const autos = await Auto.find({});

    res.json(autos);
    
  } catch (error) {
    console.error('Error fetching autos:', error);
    res.status(500).json({ error: 'An error occurred while fetching autos.' });
  }
});

module.exports = router;