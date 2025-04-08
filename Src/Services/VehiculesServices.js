const Vehicules = require("../Model/VehiculesModel");

const getVehiculesServices = async () => {
    try {
        return await Vehicules.findAll();
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error; // Let the controller handle the error
    }
};
const getVehiculeByNumImmatriculationServices = async (num_immatriculation) => {
    try {
        const vehicle = await Vehicules.findOne({
            where: { num_immatriculation }  // Cherchez par le champ num_immatriculation
        });
        return vehicle; // Retourne le véhicule trouvé
    } catch (error) {
        console.error("Error fetching vehicle by registration number:", error);
        throw error; // Laissez le contrôleur gérer l'erreur
    }
};
const addVehiculesServices = async (body) => {
    try {
        const exists = await Vehicules.findByPk(body.num_immatriculation);
        if (exists) {
            throw new Error("Le véhicule avec ce numéro d'immatriculation existe déjà.");
        }
        return await Vehicules.create(body);
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error; // Let the controller handle the error
    }
};

const getVehiculesByIdServices = async (id_vehicule) => {
    try {
        // Recherche du véhicule par id_vehicule dans la base de données
        const vehicle = await Vehicules.findOne({ where: { id_vehicule } });
        return vehicle; // Retourne le véhicule trouvé
    } catch (error) {
        console.error("Erreur lors de la récupération du véhicule:", error);
        throw error; // Laisse le contrôleur gérer l'erreur
    }
};
const updateVehiculesService = async (num_immatriculation, body) => {
    try {
        const [updated] = await Vehicules.update(body, {
            where: { num_immatriculation: num_immatriculation }, // Vérifiez ici
        });
        return updated ? await Vehicules.findOne({ where: { num_immatriculation } }) : null; // Utilisez findOne pour récupérer le véhicule
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error; // Let the controller handle the error
    }
};
const deleteVehiculesService = async (id_vehicule) => {
    try {
        const deleted = await Vehicules.destroy({
            where: { num_immatriculation: id_vehicule }
        });
        return deleted ? true : false;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error; // Let the controller handle the error
    }
};

module.exports = {
    getVehiculesServices,
    addVehiculesServices,
    getVehiculesByIdServices,
    updateVehiculesService,
    deleteVehiculesService,
    getVehiculeByNumImmatriculationServices
};
