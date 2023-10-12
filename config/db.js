const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on a connection error
  }
}

module.exports = connectToDB;
