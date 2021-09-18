const serviceModel = require("../models/serviceModel");

// User pings the server that he is ready-for-hire 
// And sends his preferred location, info about service he provide
const createService = (id, service, maxDistance) =>{
        const newService = {              
            serviceProviderID: id,
            type: service,  
            maxDistance: maxDistance
        }
        const addService = new serviceModel(newService);
        addService.save();
}

/** @return a service or null*/
/** Can be used to automatch recruiter to a specific serviceproviderID */
const getService = (serviceID) =>{
    return serviceModel.findOne({serviceID: serviceID});
}

/** @return a array or null*/
/** Can be used to get all of the services provided by particular user */
const getAllUserServices = (serviceProviderID) =>{
    return serviceModel.find({serviceProviderID: serviceProviderID});
}

/** @return a service or null*/
/** Can be used to automatch recruiter to a specific serviceproviderID */
const getAllServicesByType = (type) =>{
    return serviceModel.find({type: type});
}

// User pings the server that he is ready-for-hire 
// And sends his preferred location, info about service he provide
const deleteService = (serviceID) =>{
    serviceProviderID.delete();
}

module.exports = {createService, getService, getAllUserServices, getAllServicesByType, deleteService};