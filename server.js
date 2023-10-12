const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const autosController = require("./autosController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Configure session
app.use(
  session({
    secret: "your_secret_key", // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const routes = require("./routes"); // Import the main routes
app.use("/", routes);

app.get("/suggest-autos", async (req, res) => {
  const { source, destination, timing } = req.query;

  try {
    const autos = await autosController.fetchAndSortAutos(source, destination, timing);
    res.json({ autos });
  } catch (error) {
    console.error("Error suggesting autos:", error);
    res.status(500).send("An error occurred.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
