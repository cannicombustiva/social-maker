module.exports.validatorRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must be not empty';
    }
    if(email.trim() === '') {
        errors.email = 'Email must be not empty';
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must be not empty';
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'Password must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

    
}

module.exports.validatorLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must be not empty';
    }
    if(password === '') {
        errors.password = 'Password must be not empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    } 
}