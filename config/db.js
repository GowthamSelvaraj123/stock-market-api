const mongoose = require("mongoose");
require("dotenv").config
const connectDB = async(req, res) => {
    try
    {
        const conn = await mongoose.connect(process.env.MongoDB_URI);
        console.log("Mongo db connection successfully");
    }
    catch(err)
    {
        console.log("Mongodb connection failed", err)
    }
}

module.exports = connectDB;