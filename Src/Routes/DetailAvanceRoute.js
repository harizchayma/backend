const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findNumeroAvanceSchema, createDetailAvanceSchema, findIdDetailAvanceSchema } = require("../Validations/DetailAvanceValidation"); // Assurez-vous que le chemin est correct
const router = express.Router();
const {
    getDetailAvance,
    addDetailAvance,
    getDetailAvanceByNumeroAvance,
    updateDetailAvance,
    deleteDetailAvance
} = require("../Controllers/DetailAvanceController");

// Routes pour DetailAvance
router.get("/", getDetailAvance);
router.post("/", validateBody(createDetailAvanceSchema), addDetailAvance);
router.get("/:Numero_avance", validateParams(findNumeroAvanceSchema), getDetailAvanceByNumeroAvance);
router.put("/:id_detailAvance", validateParams(findIdDetailAvanceSchema), validateBody(createDetailAvanceSchema), updateDetailAvance);
router.delete("/:id_detailAvance", validateParams(findIdDetailAvanceSchema), deleteDetailAvance);

module.exports = router;