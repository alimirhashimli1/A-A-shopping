import { check } from "express-validator";

const productValidator = () => {
    return [
        check("productName")
            .isLength({ min: 3 })
            .withMessage("Product Name should not be less than 3 characters"),
     check("productDescription")
            .isLength({ min: 10 })
            .withMessage("Product Description should not be less than 10 characters"),     
    ]
}

export default productValidator;