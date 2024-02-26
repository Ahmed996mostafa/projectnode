const {body,param,query}=require("express-validator");
exports.insertArray = [
    body("password").isString().withMessage("Password should be a string")
                    .isLength({ min: 16 }).withMessage("Password should be at least 16 characters long"),
    
];



// exports.insertArray = [
//     body("password")
//         .isString().withMessage("Password should be a string")
//         .isLength({ min: 16 }).withMessage("Password should be at least 16 characters long")
//         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/)
//             .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
// ];
