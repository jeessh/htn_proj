const express = require('express');
const router = express.Router()
const userModel = require('../models/userModel');
const { checkPasswordEquality } = require('../controllers/authController');
const { changeUsername, changePassword, deleteUser } = require('../controllers/userController');
const { changeUsernameValidator, changePasswordValidator } = require('../validators/userControlValidator');
const { loginValidator } = require('../validators/authValidator');

/** @url for changing username */
router.post('/changeUsername', async (req, res) => {
    // get the body of the request
    const username = req.body.username;
    const newUsername = req.body.newUsername;
    const password = req.body.password;
    const dataValidity = changeUsernameValidator(username, newUsername, password);
    if(dataValidity === {}){
        // try and find the user
        const user = await userModel.findOne({username: username});
        // process results
        if(user){
            // if user exists, check if the passwords match
            if(checkPasswordEquality(user, password)){
                // perform the action
                changeUsername(user, newUsername)
                // send the response back to the client
                res.status(200).send();
            }else{
                // if passwords do not match send back a password error
                res.status(505).send({passwordErr: 'Wrong password 😢'});
            }
        }else{
            // if user does not exist send back a username error
            res.status(404).send({usernameErr: 'User does not exist 😢'});
        }
    }else{
        // if user does not exist send back a validity error (both user & password)
        res.status(505).send(dataValidity);
    }
});

/** @url for changing password */
router.post('/changePassword', async (req, res) => {
    // get the body of the request
    const username = req.body.username;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const dataValidity = changePasswordValidator(username, password, newPassword);
    if(dataValidity === {}){
        // try and find the user
        const user = await userModel.findOne({username: username});
        // process results
        if(user){
            // if user exists, check if the passwords match
            if(checkPasswordEquality(user, password)){
                // perform the action
                changePassword(user, newPassword)
                // send the response back to the client
                res.status(200).send();
            }else{
                // if passwords do not match send back a password error
                res.status(505).send({passwordErr: 'Wrong password 😢'});
            }
        }else{
            // if user does not exist send back a username error
            res.status(404).send({usernameErr: 'User does not exist 😢'});
        }
    }else{
        // if user does not exist send back a validity error (both user & password)
        res.status(505).send(dataValidity);
    }
});

/** @url for logging user in */
router.post('/deleteUser', async (req, res) => {
    // get the body of the request
    const username = req.body.username;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const dataValidity = loginValidator(username, password, newPassword);
    if(dataValidity === {}){
        // try and find the user
        const user = await userModel.findOne({username: username});
        // process results
        if(user){
            // if user exists, check if the passwords match
            if(checkPasswordEquality(user, password)){
                deleteUser(user)
                // send the response back to the client            
                res.clearCookie("token", {path:'/'});
                res.status(200).send('Successfully deleted the cookie'); 
            }else{
                // if passwords do not match send back a password error
                res.status(505).send({passwordErr: 'Wrong password 😢'});
            }
        }else{
            // if user does not exist send back a username error
            res.status(404).send({usernameErr: 'User does not exist 😢'});
        }
    }else{
        // if user does not exist send back a validity error (both user & password)
        res.status(505).send(dataValidity);
    }
});

module.exports = router