const express = require('express');
const { registrationValidator, loginValidator } = require('../validators/authValidator');
const { checkPasswordEquality, createToken, createUser, getUser, verifyToken } = require('../controllers/authController');
const userModel = require('../models/userModel');
var router = express.Router()

/** @url for logging user in */
router.post('/login', async (req, res) => {
    // get the body of the request
    const username = req.body.username;
    const password = req.body.password;
    const dataValidity = loginValidator(username, password);
    if(dataValidity === {}){
        // try and find the user
        const user = await userModel.findOne({username: username});
        // process results
        if(user){
            // if user exists, check if the passwords match
            if(checkPasswordEquality(user, password)){
                // if passwords match create a token(cookie)
                const token = createToken(user);
                // attach cookie to the response
                res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'strict'
                });
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


/** @url for registering user */
router.post('/register', async (req, res) => {
    // get the body of the request
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const dataValidity = registrationValidator(username, password, type);
    
    if(dataValidity === {}){
        // try and find the user
        const user = await userModel.findOne({username: username});
        // process results
        if(!user){
            createUser(username, password, type);
            // send OK back to the client 
            res.status(200).send();
        }else{
            // if user does not exist send back a username error
            res.status(404).send({usernameErr: 'Username taken 😢'});
        }
    }else{
        // if user does not exist send back a username error
        res.status(505).send(dataValidity);
    }
});

/** @url to verify that the token is still supposed to be active */
router.post('/verifyJwt', (req, res)=>{
    const username = req.body.username;
    const token = req.cookies;
    const user = getUser(username);
    if(user){
        if(token){
          if(verifyToken(user, token)){
            res.status(200).send('User authenticated');
          }else{
            res.status(409).send('Bad cookie');
          }
        }else{
          res.status(500).send('Cookie required');
        }
    }else{
        res.status(404).send('User no longer exists');
    }
})

/** @url to logout */
router.post('/logout', (req, res)=>{
    res.clearCookie("token", {path:'/'});
    res.status(200).send('Successfully deleted the cookie'); 
});

module.exports = router