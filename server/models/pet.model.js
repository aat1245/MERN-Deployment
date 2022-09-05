const mongoose = require("mongoose");

// to check if Pet name is unique >> npm install --save mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

// Pet name, pet type, and pet description are all required and must be 3 characters or longer
// Pets may have between 0 and 3 skills
const PetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet Name is required! "],
      minlength: [3, "Pet Name must be at least 3 characters long"],
      unique: true,
    },
    type: {
      type: String,
      require: [true, "Pet type is required"],
      minLength: [3, "Pet type must be at least 3 characters long"],
    },
    description: {
      type: String,
      require: [true, "Pet description is required"],
      minLength: [3, "Pet description must be at least 3 characters long"],
    },
    skill1: {
      type: String,
    },
    skill2: {
      type: String,
    },
    skill3: {
      type: String,
    },
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to PetSchema
//pass through a custom type and error message as part of the optional options argument
PetSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Pet {PATH} must be unique",
});

module.exports = mongoose.model("Pet", PetSchema);
