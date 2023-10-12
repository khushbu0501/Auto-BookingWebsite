const express = require("express");
const Auto = require("../models/auto"); // Import Auto model
const User = require("../models/user"); // Import User model
const router = express.Router();
const path = require("path");

const publicPath = path.join(__dirname, "../public");

router.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "register.html"));
});

router.post("/register", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    email: req.body.email,
  };
  await User.insertMany([data]);
  res.redirect("/login");
});

router.post("/login", async (req, res) => {
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

router.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    // Redirect to login page after logout
    res.redirect("/login");
  });
});

router.get("/student-profile", (req, res) => {
  res.sendFile(path.join(publicPath, "student_profile.html"));
});

router.get("/provider-profile", (req, res) => {
  res.sendFile(path.join(publicPath, "provider_profile.html"));
});

module.exports = router;
