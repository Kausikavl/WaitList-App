// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Define an asynchronous function to connect to the MongoDB database
const db = async () => {
    try {
        // Attempt to connect to the MongoDB database
        let connection = await mongoose.connect('mongodb://localhost:27017/room').then(() => {
            // Log a message when the database connection is successful
            console.log("db connected");
        });
    } catch (err) {
        // Log any errors that occur during the connection attempt
        console.log(err);
        // Throw an error to indicate that the connection failed
        throw new Error(err);
    }
};

// Export the database connection function for use in other modules
module.exports = db;
