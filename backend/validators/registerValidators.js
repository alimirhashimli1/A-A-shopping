import { check } from "express-validator";


const registerValidator = () => {
    return [
        check("userName")
            .trim().isLength({ min: 3, max: 15 })
            .withMessage("User Name must be between 3 and 15 characters")
            .custom(value => {
                return value.toLowerCase().indexOf("AAShoopping") === -1;
            })
            .withMessage("AAShoopping Is reserved by the company!"),
        check("emailAddress")
            .normalizeEmail().isEmail()
            .withMessage("Email address should be valid "),
        check("password")
            .escape().trim().isStrongPassword()
            .withMessage("Password must be minimum 8 contain at least lowercase, uppercase, number and symbol"),
    ]
}
export default registerValidator;