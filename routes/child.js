const express = require("express");
const router = express.Router();
const ChildController = require("./../controlles/childController");
const Auth=require("../MW/Auth/Authorization")
const validateChild=require("../MW/Auth/validation/childvalidtion")
const validation=require("../MW/Auth/validation/validator")



    router.route("/child")
    .get( Auth.isAdmin , ChildController.getallchild)
    .post(  Auth.isAdmin , validateChild.insertArray , validation,ChildController.insertChild )
    .patch(  Auth.isAdmin, validateChild.insertArrayUpdate , validation,ChildController.updateChild )
    .delete( Auth.isAdmin , validateChild.insertArrayUpdate , validation,ChildController.deleteChild )


        router.route("/child/:id") 
        .get(  Auth.isAdmin , validateChild.insertArray_param , validation, ChildController.getchildbyid )
    

module.exports = router;