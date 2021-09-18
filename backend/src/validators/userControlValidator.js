const  changeUsernameValidator = (username, newUsername, password) =>{
    let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    let response = {};
    if(!username){
        response.usernameError = 'Username is required';
    } 
    if(!newUsername){
        response.newUsernameError = 'Username is required';
    } 
    if(password){
        if(password.length < 8 || !(pattern.test(password))){
            response.passwordError = 'Password must be 8 characters long, and ' + 
            'contain at least 1 digit, 1 capital letter, and 1 special character';   
        }
    }else{
        response.passwordError = 'Password is required';
    }
    return response;
}

const  changePasswordValidator = (username, password, newPassword) =>{
    let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    let response = {};
    if(!username){
        response.usernameError = 'Username is required';
    } 
    if(password){
        if(password.length < 8 || !(pattern.test(password))){
            response.passwordError = 'Password must be 8 characters long, and ' + 
            'contain at least 1 digit, 1 capital letter, and 1 special character';   
        }
    }else{
        response.passwordError = 'Password is required';
    }
    if(newPassword){
        if(newPassword.length < 8 || !(pattern.test(newPassword))){
            response.passwordError = 'Password must be 8 characters long, and ' + 
            'contain at least 1 digit, 1 capital letter, and 1 special character';   
        }
    }else{
        response.newPasswordError = 'Password is required';
    }
    return response;
}

module.exports = { changeUsernameValidator, changePasswordValidator }