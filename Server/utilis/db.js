const mongoose = require("mongoose");

const db = async (req, res) => {
  try {
    await mongoose.connect(process.env.mongo_URI);
    console.log("Successfully connected to db");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};

module.exports = db;
