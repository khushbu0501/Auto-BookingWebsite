const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/database")
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
  role: {
    type: String,
    required: true,
    enum: ["Student", "Provider"],
  },
});

const Users = new mongoose.model("User", userSchema);

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
  };
  await Users.insertMany([data]);
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await Users.findOne({ username: req.body.username });
    if (check && check.password === req.body.password) {
      if (check.role === "Student") {
        res.redirect("/student-profile");
      } else if (check.role === "Provider") {
        res.redirect("/provider-profile");
      } else {
        res.send("Invalid role");
      }
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    console.error(error);
    res.send("An error occurred.");
  }
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
