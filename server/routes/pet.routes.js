const PetController = require("../controllers/pet.controller");
function registerPetRoutes(app) {
  app.get("/api/pets", PetController.getAllPets);
  app.get("/api/pets/:id", PetController.onePet);
  app.put("/api/pets/:id", PetController.updatePet);
  app.post("/api/pets/new", PetController.createNewPet);
  app.delete("/api/pets/:id", PetController.deletePetById);
}

module.exports = registerPetRoutes;
