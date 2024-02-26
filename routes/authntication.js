const express = require("express");
const router = express.Router();
const UserController = require("../controlles/Auth");
const passvalidtion=require("../MW/Auth/validation/chngpassvalidition")


router.post('/signup',UserController.signup)
router.post('/signin',UserController.signin)
router.patch("/changePassword" , UserController.ChangePassword)

module.exports=router