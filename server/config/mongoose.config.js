const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/pet_database")
  .then(() => console.log("Succesfully connected to the database"))
  .catch((err) => console.log("Failed to connect to the database"));