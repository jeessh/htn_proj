const registrationValidator = (username, password, type) =>{
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

    if(type){
        if(type!=="employer" || type!=="worker"){
            response.TypeError = 'Unknown type';
        }
    }else{
        response.TypeError = 'Type is required';
    }

    return response;

}

const loginValidator = (username, password) =>{
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
    return response;

}

module.exports = { registrationValidator, loginValidator }