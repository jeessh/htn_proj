const express = require('express');
const router = express.Router();
const {filterMatches} = require('../controllers/matchingController');

/** @url to retrieve information from employer and sends to worker */
router.post('/searchForUsers' , async (req, res) => {
    const query = req.body;
    const type = query.type;
    return await filterMatches(type);
});

module.exports = router;