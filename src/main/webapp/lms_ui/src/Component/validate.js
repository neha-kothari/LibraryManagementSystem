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


const validateRegisterBook = book => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (!book || typeof book.bookTitle !== "string" || book.bookTitle.trim().length === 0 || book.isbnNumber.trim().length === 0
        || book.publisher.trim().length === 0|| book.language.trim().length === 0|| book.noOfPages === 0 || book.noOfCopies === 0
        || book.dateOfPurchase === "" || book.publicationYear === "0" || book.authors.length===0) {
        isFormValid = false;
        errors.name = "Please fill all the details.";
    }
    if(!book || book.authors.length===0)
    {
        errors.name+=" There must be at least one Author"
    }
    else {
        for(let i=0;i<book.authors.length;i++)
        {
            if(book.authors[i]==="")
            {
                isFormValid=false
                errors.name+="Author field cannot be empty"
            }
        }
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

const validateEditBook = book => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (!book || typeof book.bookTitle !== "string" || book.bookTitle.trim().length === 0 || book.isbnNumber.trim().length === 0
        || book.publisher.trim().length === 0|| book.language.trim().length === 0|| book.noOfPages === 0 || book.publicationYear === "0" || book.authors.length===0) {
        isFormValid = false;
        errors.name = "Please fill all the details.";
    }
    if(!book || book.authors.length===0)
    {
        errors.name+=" There must be at least one Author"
    }
    else {
        for(let i=0;i<book.authors.length;i++)
        {
            if(book.authors[i]==="")
            {
                isFormValid=false
                errors.name = "Author field cannot be empty"
            }
        }
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
    validateSignUpForm: validateSignUpForm,
    validateRegisterBook:validateRegisterBook,
    validateEditBook:validateEditBook
};
