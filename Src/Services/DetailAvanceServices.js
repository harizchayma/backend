const DetailAvance = require("../Model/DetailAvanceModel"); // Assurez-vous que le chemin est correct

const getDetailAvanceServices = async () => {
    try {
        return await DetailAvance.findAll();
    } catch (error) {
        console.error('Error fetching DetailAvance:', error);
        throw error; 
    }
};
const getDetailAvanceByNumeroAvanceServices = async (Numero_avance) => {
    try {
        return await DetailAvance.findOne({ where: { Numero_avance } });
    } catch (error) {
        console.error("Error fetching DetailAvance by Numero_avance:", error);
        throw error; // Propager l'erreur pour qu'elle soit gérée par le contrôleur
    }
};
const addDetailAvanceServices = async (body) => {
    try {
        return await DetailAvance.create(body);
    } catch (error) {
        console.error("Error adding DetailAvance:", error);
        throw error; 
    }
};

const getDetailAvanceByIdServices = async (id_detailAvance) => {
    try {
        return await DetailAvance.findOne({ where: { id_detailAvance } });
    } catch (error) {
        console.error("Error fetching DetailAvance by ID:", error);
        throw error;
    }
};

const updateDetailAvanceService = async (id_detailAvance, body) => {
    try {
        const [updated] = await DetailAvance.update(body, {
            where: { id_detailAvance },
        });
        return updated ? await DetailAvance.findByPk(id_detailAvance) : null;
    } catch (error) {
        console.error("Error updating DetailAvance:", error);
        throw error;
    }
};

const deleteDetailAvanceService = async (id_detailAvance) => {
    try {
        const deleted = await DetailAvance.destroy({
            where: { id_detailAvance }
        });
        return deleted; 
    } catch (error) {
        console.error("Error deleting DetailAvance:", error);
        throw error; 
    }
};

module.exports = {
    getDetailAvanceServices,
    getDetailAvanceByNumeroAvanceServices,
    addDetailAvanceServices, 
    getDetailAvanceByIdServices,
    updateDetailAvanceService,
    deleteDetailAvanceService
};