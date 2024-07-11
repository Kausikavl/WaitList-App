const router = require("express").Router();

const {protected} =require('../middleware/protected');
const {getall,update,deleteDetail} = require('../controller/adminController')

const {userInfo  } =require('../controller/userController');
const { sendEMail , createOtp , verifyOtp ,  } = require("../controller/otpController");


// routes to room file
router.use('/getall' , getall);

router.use('/update/:_id',update)

router.delete('/delete/:id',deleteDetail)


module.exports = router;