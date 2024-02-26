const express = require("express");
const router = express.Router();
const teacherController = require("../controlles/teacherController");
const teachervalid=require("../MW/Auth/validation/teachervalidtion")
const validator=require("../MW/Auth/validation/validator")
const Auth=require("../MW/Auth/Authorization")
const addImage = require('../MW/Auth/addimage'); 



router.route("/teacher")
    .get( Auth.isAdmin ,teacherController.GetallTeacher)

    .post(  addImage ,teachervalid.insertArray,validator,teachervalid.insertArray,validator, teacherController.addNewTeacher)

    .patch( teachervalid.insertArrayUpdate , validator,teacherController.updateTeacher)

    .delete( Auth.isAdmin ,teacherController.deleteTeacher);


router.route("/teacher/:id")
    .get (teachervalid.insertArray,teacherController.getteacherbyid)

router.route("/teachers/supervisor")
    .get( Auth.isAdmin ,teacherController.getAllsupervisor);

module.exports = router;