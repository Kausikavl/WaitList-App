
//controller
const { login, register } = require("../controller/authController");
const {adminLogin} = require('../controller/adminController')


const router = require("express").Router();

//for login 
router.post("/login",  login); 

//for sigup 
router.post("/register", register);

router.post("/admin",adminLogin)

module.exports = router;
