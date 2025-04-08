const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdVehiculesSchema,findNumImmatriculationSchema, createVehiculesSchema } = require("../Validations/Vehicules");
const router = express.Router();
const {
    getVehicules,
    addVehicules,
    getVehiculesById,
    updateVehicules,
    deleteVehicules,
    getVehiculeByNumImmatriculation // Ajoutez cette ligne
} = require("../Controllers/VehiculesController");

// Define routes
router.get("/", getVehicules);
router.get("/immatriculation/:num_immatriculation", validateParams(findNumImmatriculationSchema), getVehiculeByNumImmatriculation);
router.post("/", validateBody(createVehiculesSchema), addVehicules);
router.get("/:id_vehicule", validateParams(findIdVehiculesSchema), getVehiculesById);
router.put("/:num_immatriculation", validateParams(findNumImmatriculationSchema), validateBody(createVehiculesSchema), updateVehicules);
router.delete("/:id_vehicule", validateParams(findIdVehiculesSchema), deleteVehicules);

module.exports = router;