// autosController.js

const Auto = require("./models/auto"); // Update the path based on your project structure

async function fetchAndSortAutos(source, destination, timing) {
  try {
    let autos = await Auto.find({ availability: true, source });

    // Sort autos based on rating (highest rating first)
    autos.sort((a, b) => b.rating - a.rating);

    if (destination) {
      autos.sort((a, b) => {
        const destinationA = a.destination.toLowerCase();
        const destinationB = b.destination.toLowerCase();
        if (destinationA < destinationB) return -1;
        if (destinationA > destinationB) return 1;
        return 0;
      });
    }

    if (timing) {
      autos.sort((a, b) => {
        const timeA = a.timing.split(":").join("");
        const timeB = b.timing.split(":").join("");
        return timeA - timeB;
      });
    }

    return autos;
  } catch (error) {
    console.error("Error fetching and sorting autos:", error);
    throw new Error("An error occurred while fetching and sorting autos.");
  }
}

module.exports = { fetchAndSortAutos };
