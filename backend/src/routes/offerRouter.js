const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/userController');
const {sendOffer, deleteOffer, getAllOffers} = require('../controllers/offerController');
const {addCurrentJob, finishJob} = require('../controllrs/currentJobModel');

/** @url to retrieve information from employer and sends to worker */
router.post('/getAllOffers' , async (req, res) => {
    const query = req.body;
    const targetID = query.targetID;
    return await getAllOffers(targetID);
});


/** @url to retrieve information from employer and sends to worker */
router.post('/retrieveOfferData' , (req, res) => {
    const query = req.body;
    const targetID = query.targetID;
    const target = getOfferData(targetID);
});

/** @url for worker to accept the offer */
router.post('/acceptOffer', (req, res)=>{
    const offerID = req.body.offerID;
    const address = req.body.address;
    const jobType = req.body.jobType;

    //checks if user exists
    if(user){
        //deletes ongoing offer from database
        deleteOffer(offerID);
        //adds details to currentjob database (currentJob management in currentJobRouter.js)
        addCurrentJob(jobID, worker, employer, address, jobType);
    }else{
        res.status(404).send({usernameErr: 'User does not exist'});
    }
}); 

/** @url for worker to decline the offer */
router.post('/declineOffer', (req,res) => {
    const offerID = req.body.offerID;
    //checks if user exists
    if(user){
        //removes the pending offer from database
        deleteOffer(offerID);
        res.status(200).send();
    }else{
        res.status(404).send({usernameErr: 'User does not exist'});
    }
    
});

module.exports = router;