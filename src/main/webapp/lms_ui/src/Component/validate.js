const validator = require("validator");

const validateSignUpForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (!payload || typeof payload.name !== "string" || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = "Please provide a user name.";
    }

    if (!payload || payload.phoneNumber.trim().length === 0) {
        isFormValid = false;
        errors.phoneNumber = "Please provide a phone number.";
    }
    
    if (!payload || typeof payload.emailAddress !== "string" || !validator.isEmail(payload.emailAddress)) {
        isFormValid = false;
        errors.emailAddress = "Please provide a correct email address.";
    }

    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    // if (!payload || payload.pwconfirm !== payload.password) {
    //     isFormValid = false;
    //     errors.pwconfirm = "Password confirmation doesn't match.";
    // }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};

const validateLoginForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (
        !payload ||
        typeof payload.name !== "string" ||
        payload.name.trim().length === 0
    ) {
        isFormValid = false;
        errors.name = "Please provide your user name.";
    }

    if (
        !payload ||
        typeof payload.password !== "string" ||
        payload.password.trim().length === 0
    ) {
        isFormValid = false;
        errors.password = "Please provide your password.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};

module.exports = {
    validateLoginForm: validateLoginForm,
    validateSignUpForm: validateSignUpForm
};
