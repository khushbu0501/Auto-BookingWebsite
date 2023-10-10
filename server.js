const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb://localhost:27017/database"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Provider"],
  },
});

const User = new mongoose.model("user", userSchema);

const autoSchema = new mongoose.Schema({
  autoNumber: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 6,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Autos = new mongoose.model("auto", autoSchema);

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    email: req.body.email,
  };
  await User.insertMany([data]);
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, username, password } = req.body;

    // Check if either email or username, and password are provided
    if ((!email && !username) || !password) {
      return res.status(400).send("Email/Username and password are required.");
    }

    console.log("Searching for user...");

    // Use email or username to find the user
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    console.log("User found:", user);

    if (user && user.password === password) {
      console.log("Login successful!");

      if (user.role === "Student") {
        res.redirect(`/student-profile?username=${user.username}`);
      } else if (user.role === "Provider") {
        res.redirect("/provider-profile");
      } else {
        res.status(400).send("Invalid role");
      }
    } else {
      console.log("Invalid credentials");
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred.");
  }
});

// Logout endpoint
app.use(
  session({
    secret: "your_secret_key", // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    // Redirect to login page after logout
    res.redirect("/login");
  });
});

app.get("/student-profile", (req, res) => {
  res.sendFile(__dirname + "/public/student_profile.html");
});

app.get("/provider-profile", (req, res) => {
  res.sendFile(__dirname + "/public/provider_profile.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
