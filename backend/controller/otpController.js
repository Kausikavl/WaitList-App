// Import nodemailer for sending emails
const nodemailer = require("nodemailer");
// Load environment variables from a .env file into process.env
require("dotenv").config();
const { emailConfig } = require("../config/nodemailer");

const OTP = require("../model/OTP");

const User = require("../model/User");
const createOtp = async (req, res, next) => {
  try {
    //reneate a random otp
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const createdOTP = await OTP.create({
      email: req.user.email,
      otp: randomNumber,
    });
    console.log("createdOTP", createdOTP.otp);
    req.otp = createdOTP.otp;
    next();
  } catch (error) {
    console.log(error);
    return res.status(5000).json({ error });
  }
};
// Function to send an email with the OTP
const sendEMail = (req, res) => {
  console.log(req.user.email)
  const transporter = nodemailer.createTransport(emailConfig);
  const mailOptions = {
    from: 'kausikavl25@gmail.com', //Send the address
    to: req.user.email, //Receivers the email Address
    subject: "test subject", //Subject of the email
    html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Registration for Iphone 14</a>
    </div>
    <p style="font-size:1.1em">Hi, ${req.user.name}</p>
    <p> Use the following OTP to complete verification process. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      
    </div>
  </div>
</div>`,
  };
  //send the email
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("email sent");

      // Send success response if email is sent successfully
      return res.status(201).json({
        message: "you should receive an email",
        email: info,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

// Function to verify the OTP
const verifyOtp = async (req, res) => {
  try {
    const { email } = req.user;
    let { otp } = req.body;
    otp = Number(otp);
    const usersOTPs = await OTP.find({ email: email });
    for (let userOTP of usersOTPs) {
      if (userOTP.otp == otp) {
        console.log(userOTP);
        console.log("OTP verified updating the user to verified user");
        await User.findOneAndUpdate(
          { email: userOTP.email },
          { verified: true }
        );
         // Fetch the updated user details
        let user = await User.findOne({ email: email });
        return res.status(200).json({ message: "user verified", user });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error });
  }
};

module.exports = { sendEMail, createOtp, verifyOtp };
