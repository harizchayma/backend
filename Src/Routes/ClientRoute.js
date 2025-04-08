const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdClientSchema, createClientSchema } = require("../Validations/ClientValidation"); // Assurez-vous que createClientSchema est importé
const router = express.Router();
const {
    getClient,
    addClient,
    getClientById,
    updateClient,
    deleteClient,
    getClientByCIN,
    loginClient,
    updateClientLoginInfo // Assurez-vous que ce contrôleur est importé
} = require("../Controllers/clientController");

// Routes
router.get("/", getClient);
router.get("/cin_client", getClientByCIN);
router.post("/", validateBody(createClientSchema), addClient);
router.get("/:id_client", validateParams(findIdClientSchema), getClientById);
router.put("/:id_client", validateParams(findIdClientSchema), validateBody(createClientSchema), updateClient);
router.delete("/:id_client", validateParams(findIdClientSchema), deleteClient);

// Nouvelle route pour la mise à jour des informations de connexion
router.put("/:id_client/login", validateParams(findIdClientSchema), /* Middleware de validation spécifique pour email/password (facultatif) */ updateClientLoginInfo);

// Route pour la connexion (inchangée)
router.post("/login", loginClient);

module.exports = router;