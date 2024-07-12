// Import JWT for token verification and User model
const jwt = require("jsonwebtoken");
const User = require("../model/User");
// Middleware to protect routes by verifying JWT tokens
const protected = async (req, res, next) => {
  try {
    // Check if the authorization header exists and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token = req.headers.authorization.split(" ")[1];
      // Get the JWT secret key from environment variables
      let jwtSecretKey = process.env.JWT_SECTET;
        // Verify the token using the secret key
      const verified = jwt.verify(token, jwtSecretKey);
      if (verified) {

        let isValid = await User.findById({ _id: verified._id });

        if (isValid) {
          console.log("protected middleware verified jwt");
          req.user = isValid;
          next();
        } else {
          res.status(400).send({ message: "user dosent exist" });
        }
      } else {
        return res.status(401).send(error);
      }
    } else {
       // If the authorization header is missing, send an unauthorized response
      return res.status(401).send({ message: "required token" });
    }
  } catch (err) {
    return res.status(401).send(err);
  }
};
module.exports = { protected };
