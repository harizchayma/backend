const joi = require("joi");

const createAvanceSchema = joi.object({
    cin_client: joi.string().length(8).required(),
    date: joi.date().required(),
    Numero_contrat: joi.string().allow(null), // Corrected the typo here
    Numero_avance: joi.string().allow(null), 
}).unknown(true); // Allows additional properties not defined in the schema

const findIdAvanceSchema = joi.object({
    id_avance: joi.number().integer().required()
});

// Exporting the schemas
exports.createAvanceSchema = createAvanceSchema;
exports.findIdAvanceSchema = findIdAvanceSchema;