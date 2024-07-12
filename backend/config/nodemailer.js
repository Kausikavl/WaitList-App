// Load environment variables from a .env file into process.env
require('dotenv').config();
const emailConfig = {
  service: "gmail",
  secure: true,
  // Authentication details for the email account
  auth: {
    user: 'kausikavl25@gmail.com',
    pass: 'iawx belk woxm gitm',
  },
};
module.exports = { emailConfig };
