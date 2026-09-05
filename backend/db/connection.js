const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function connectDB() {
    try {
        const conn =  mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected...`);
    } catch (err) {
        console.log(err);
    }

}
module.exports = connectDB;