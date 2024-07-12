// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt') // Uncomment if you want to use bcrypt for password hashing

// Define the schema for the admin collection
const adminSchema = new mongoose.Schema({
  // Username field which is required and unique
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Password field which is required
  password: {
    type: String,
    required: true
  }
});

// Middleware to hash the password before saving the admin document
// Uncomment if you want to use bcrypt for password hashing
// adminSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10); // Generate a salt
//   this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
//   next(); // Call the next middleware or save function
// });

// Create a model from the schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model
module.exports = Admin;
