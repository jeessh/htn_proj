const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

/** @return a user or null*/
/** Can be used to extract user from database or to verify if they exist */
const createUser = async (username, password, type) =>{
    const newUser = {
        username: username,
        password: password,
        type: type,
        salt: await bcrypt.genSalt()
    }
    const addUser = new userModel(newUser);
    addUser.save();
}

/** @return a user or null*/
/** Can be used to extract user from database or to verify if they exist */
const getUser = (username) =>{
    return userModel.findOne({username: username});
}

/** @return true/false*/
/** Is used to check if passwords are valid */
const checkPasswordEquality = (user, password) =>{
    return await bcrypt.compare(password, user.password);;
}

/** @return an authentication token */
/** This function is used to grant the user an authentication token */
const createToken = (user) =>{
    return jwt.sign({user_id: user._id}, user.salt);
}

const verifyToken = (user, token) =>{
    return (jwt.verify(token, user.salt)).user_id === user._id;
}

module.exports = {createUser, getUser, checkPasswordEquality, createToken, verifyToken};