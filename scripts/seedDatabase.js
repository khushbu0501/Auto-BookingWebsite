const mongoose = require("mongoose");
const Auto = require("../models/auto");

mongoose.connect("mongodb://localhost:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const autosData = [
  {
    autoNumber: "A001",
    driverName: "John Doe",
    capacity: 6,
    availability: true,
    rating: 4.5,
  },
  {
    autoNumber: "A002",
    driverName: "Jane Smith",
    capacity: 6,
    availability: true,
    rating: 3.8,
  },
  {
    autoNumber: "A003",
    driverName: "Ram lal",
    capacity: 6,
    availability: true,
    rating: 4.6,
  },

  {
    autoNumber: "A004",
    driverName: "Shaam",
    capacity: 6,
    availability: true,
    rating: 3.9,
  },

  {
    autoNumber: "A005",
    driverName: "Sundar",
    capacity: 6,
    availability: true,
    rating: 4.3,
  },
  {
    autoNumber: "A006",
    driverName: "Mohan",
    capacity: 6,
    availability: true,
    rating: 3.6,
  },
  {
    autoNumber: "A007",
    driverName: "Mohak",
    capacity: 6,
    availability: true,
    rating: 4.8,
  },
  {
    autoNumber: "A008",
    driverName: "Vishnu",
    capacity: 6,
    availability: true,
    rating: 3.7,
  },
  {
    autoNumber: "A009",
    driverName: "Raju",
    capacity: 6,
    availability: true,
    rating: 4.3,
  },
  {
    autoNumber: "A010",
    driverName: "BholeNath",
    capacity: 6,
    availability: true,
    rating: 3.4,
  },
];

async function seedDatabase() {
  try {
    await Auto.deleteMany({}); // Clear existing autos data
    await Auto.insertMany(autosData);
    console.log("Autos added successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
