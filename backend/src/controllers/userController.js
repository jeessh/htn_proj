
/** @params user and new username*/
/** Is used to change username */
const changeUsername = (user, newUsername)=>{
    user.username = newUsername;
    user.save();
}

/** @params user and new password*/
/** Is used to change password */
const changePassword = (user, newPassword)=>{
      user.password = newPassword;
      user.save();
}


/** @params user and new location*/
/** Is used to change location */
const changeLocation = (user, newAddress)=>{
    user.address = newAddress;
    user.save();
}

/** @params user*/
/** Is used to delete the user */
const deleteUser = (user)=>{
    user.delete(); 
}

module.exports = {changeUsername, changePassword, deleteUser, changeLocation};