const userModel = require('../models/userModel.js');
const serviceModel = require('../models/serviceModel.js');
const ratingModel = require('../models/ratingModel.js');
const recruiterPostalCode = 'T2Y 5C6'; // postal code of homeowner
const distance = require('./googleMapsController');

function getAverageRating(array) {
    let sum = 0;
    let iterations = 0;
    array.foreach((item)=>{
        sum+=item;
        iterations++
    });
    return sum/iterations;
}
// https://stackoverflow.com/questions/41199460/simple-average-function-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const filterMatches = async (type) => {
    const services = await serviceModel.find({type: type});
    services = services.filter( (item) => { // filter by distance
        const targetID = item.serviceProviderID;
        const targetUser = await userModel.findOne({_id: targetID});
        const distance = distance(targetUser.address, address);
        item.maxDistance >= distance
    });
    return services;
};

module.exports = {filterMatches}