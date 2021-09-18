const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/userController');
const {createService, deleteService} = require('../controllers/worker.serviceController');

/** @url for workers to set their service */
router.post('/activeTrigger', (req, res) => {
    const username = req.body.username;
    const user = getUser(username);
    const services = req.body.services;
    const maxDistance = req.body.maxDistance;
    if(user){
        const id = user._id; //this one gets id?- from the user, yes
        services.foreach((service)=>{        
            createService(id, service, maxDistance);
        });
        res.status(200).send("😘");
    }else{
        res.status(404).send({usernameErr: 'User does not exist'});
    }
})

router.post('/inactiveTrigger', (req, res)=>{const username = req.body.username;
    const user = getUser(username);
    if(user){
        const id = user._id; //this one gets id?- from the user, yes
        const services = getAllUserServices(id);
        services.foreach((service)=>{
            deleteService(service);
        })
        res.status(200).send("😘");
    }else{
        res.status(404).send({usernameErr: 'User does not exist'});
    }
});

router.post('/restart', (req, res)=>{
    const username = req.body.username;
    const services = req.body.services;
    const maxDistance = req.body.maxDistance;
    const user = getUser(username);
    if(user){
        const id = user._id; //this one gets id?- from the user, yes
        const toDelete = getAllUserServices(id);
        toDelete.foreach((service)=>{
            deleteService(service);
        });

        services.foreach((service)=>{        
            createService(id, service, maxDistance);
        });

        res.status(200).send("😘");
    }else{
        res.status(404).send({usernameErr: 'User does not exist'});
    };
});

module.exports = router