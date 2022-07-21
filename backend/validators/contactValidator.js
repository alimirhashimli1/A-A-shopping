import {check} from "express-validator"

const contactValidator = () => {
    return [
        check("emailAddress")
        .normalizeEmail().isEmail()
        .withMessage("Email address should be in a valid format"),

        check("phoneNumber")
        .isNumeric()
        .withMessage("Phone number should a number"),

        check("yourMessage")
        .trim().isLength({ min: 10, max: 500 })
        .withMessage("Your message should not be less than 10 and more than 500 characters.")
        
    ]
}

export default contactValidator