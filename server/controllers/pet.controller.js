const Pet = require("../models/pet.model");
function getAllPets(req, res) {
  //.sort({filed_name:1 or -1})
  //The value is 1 or -1 that specifies an ascending or descending sort respectively
  Pet.find()
    .sort({ type: 1 })
    .then((allPet) => res.json(allPet))
    .catch((err) => res.json({ errorMsg: "Failed to fetch all Pets" }));
}

const onePet = (request, response) => {
  Pet.findOne({ _id: request.params.id })
    .then((pet) => response.json(pet))
    .catch((err) => {
      console.log(err);
      response.sendStatus(404);
    });
};

function createNewPet(req, res) {
  Pet.create(req.body)
    .then((newlyCreatedPet) => res.json(newlyCreatedPet))
    .catch((err) => res.status(400).json(err));
}

const updatePet = (request, response) => {
  Pet.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPet) => response.json(updatedPet))
    .catch((err) => response.status(400).json(err));
};

function deletePetById(req, res) {
  const { id } = req.params;
  Pet.deleteOne({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json({ error: true, message: "Failed to delete pet" }));
}

module.exports = {
  getAllPets,
  createNewPet,
  updatePet,
  deletePetById,
  onePet,
};
