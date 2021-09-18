const currentJobModel = require('../models/currentJobModel.js');

const addCurrentJob = (jobID, worker, employer, address, jobType) =>{
        const newCurrentJob = {              
            jobID: jobID,
            serviceProviderID: worker,  
            employerID: employer,
            address: address,
            jobType: jobType
        }
        const addCurrent = new currentJobModel(newCurrentJob);
        addCurrent.save();
};

/** @params id of service provider. SP can only have 1 job at a a time.  */
const getJob = async (serviceProviderID) =>{
    return await currentJobModel.findOne({serviceProviderID: serviceProviderID});
}

const finishJob = (job) =>{
    job.delete();
};

module.exports = { addCurrentJob, getJob, finishJob }