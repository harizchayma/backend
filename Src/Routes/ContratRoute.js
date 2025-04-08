const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdContratSchema, createContratSchema } = require("../Validations/ContratValidation");
const router = express.Router();
const {
    getContrat,
    getLastNumeroContrat,
    addContrat,
    getContratById,
    updateContrat,
    deleteContrat,
    getContratByCinClient // Add this function
} = require("../Controllers/ContratController");

// Define routes
router.get("/", getContrat);
router.post("/", validateBody(createContratSchema), addContrat);
router.get("/last", getLastNumeroContrat);
router.get("/:ID_contrat", validateParams(findIdContratSchema), getContratById);
router.put("/:ID_contrat", validateParams(findIdContratSchema), validateBody(createContratSchema), updateContrat);
router.delete("/:ID_contrat", validateParams(findIdContratSchema), deleteContrat);
router.get("/cin/:cin_client", getContratByCinClient); // New route to get contracts by cin_client

module.exports = router;