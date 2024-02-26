const {body,param,query}=require("express-validator");
exports.insertArray = [
    body('_id').isInt({min:1}).withMessage('ID must be an integer'),
    body('name').isString().withMessage('Name must be a string'),
    body('supervisor').isMongoId().withMessage('Supervisor must be a valid ObjectId'),
    body('children').isArray().withMessage('Children must be an array')
                    .isInt({min:1}).withMessage('Each child ID must be an integer'),
];


exports.insertArrayUpdate = [
    body('_id').optional().isInt({ min: 1 }).withMessage('ID must be an integer'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('supervisor').optional().isMongoId().withMessage('Supervisor must be a valid ObjectId'),
    body('children').optional().isArray().withMessage('Children must be an array')
                    .optional().isInt({ min: 1 }).withMessage('Each child ID must be an integer'),
];

exports.insertArray_param = [
    param("id").custom(value => {
        if (!Number.isInteger(Number(value)) || value <= 0) {
            throw new Error("ID should be a positive integer");
        }
        return true;
    })
];


