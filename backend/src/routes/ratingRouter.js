const express = require('express');
const router = express.Router();
const ratingModel = require('../models/ratingModel');
const { addRating, deleteRating, getAllRating, getAverageRating } = require('../controllers/ratingController');

//rootID, targetID, ratingNum, ratingText

/** @url to retrieve all ratings for a worker (targetID) */
router.post('/getAllRatings' , async (req, res) => {
    const query = req.body;
    const targetID = query.targetID;
    return await getAllRatings(targetID);
});

/** @url for employer to post a rating of a worker */
router.post('/postRating', async (req,res) => {
    const rootID = req.body.rootID;
    const targetID = req.body.targetID;
    const ratingNum = req.body.ratingNum;
    const ratingText = req.body.ratingText;

    //checks if ID of employer exists
    if(rootID){
        //checks if ID of worker exists
        if(targetID){
            //adds rating to rating db
            addRating(rootID, targetID, ratingNum, ratingText);
            res.status(200).send('rating added');

        }else{
            res.status(404).send({usernameErr: 'Worker does not exist'});
        }
    }else{
        res.status(404).send({usernameErr: 'Employer does not exist'});
    }
    
});

router.port()
module.exports = router;