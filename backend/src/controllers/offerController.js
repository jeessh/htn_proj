const userModel = require('../models/userModel.js');
const serviceModel = require('../models/serviceModel.js');
const ratingModel = require('../models/ratingModel.js');

//sends offer from the employer to the worker (chooses to accept/decline)
const getAllOffers = (userID) =>{ 
    return await offerModel.find({targetID: userID})
}

const getOfferData = async (offerID) =>{
    return await offerModel.find({targetID: userID})
}

//sends offer from the employer to the worker (chooses to accept/decline)
const createOffer = (offerID, employerID, address, jobType) =>{ 
    const newOffer = {              
        offerID: offerID,
        employerID: employerID,
        address: address,
        jobType: jobType
    }
    const addOffer = new offerModel(newOffer);
    addOffer.save();
}

//deletes offer from db (when accepted/declined)
const declineOffer = (offer) =>{
    offer.delete();
}

module.exports = { createOffer, deleteOffer, getAllOffers}