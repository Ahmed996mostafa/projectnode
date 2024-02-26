const express = require("express");
const router = express.Router();
const ClassController = require("../controlles/classcontroller");
const validateClass=require("../MW/Auth/validation/classvalidition")
const validation=require("../MW/Auth/validation/validator")
const Auth=require("../MW/Auth/Authorization")


router.route("/class")
    .get( Auth.isAdmin , ClassController.GetallClass)
    .post( Auth.isAdmin , validateClass.insertArray , validation,ClassController.insertClass)
    .patch( Auth.isAdmin , validateClass.insertArrayUpdate , validation,ClassController.updateClass)
    .delete( Auth.isAdmin , ClassController.deleteClassbyid)

router.route("/class/:id") 
    .get( Auth.isAdmin , validateClass.insertArray_param , validation,ClassController.getclassbyid)
    

    router.route("/class/child/:id") 
    .get( Auth.isAdmin , ClassController.getAllClassChildernById)

    router.route("/class/teacher/:id") 
    .get( Auth.isAdmin , ClassController.getClassSupervisorInfo)
    
    

module.exports = router;