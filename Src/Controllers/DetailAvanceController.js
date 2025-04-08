const {
    getDetailAvanceServices,
    getDetailAvanceByNumeroAvanceServices,
    addDetailAvanceServices,
    getDetailAvanceByIdServices,
    updateDetailAvanceService,
    deleteDetailAvanceService
} = require("../Services/DetailAvanceServices");

const handleResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message: message,
        data: data
    });
};

const getDetailAvance = async (req, res) => {
    try {
        const data = await getDetailAvanceServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "DetailAvance retrieved successfully" : "No DetailAvance found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving DetailAvance", { error: error.message });
    }
};

const addDetailAvance = async (req, res) => {
    console.log("Received body:", req.body); 
    try {
        const data = await addDetailAvanceServices(req.body);
        return handleResponse(res, 201, "DetailAvance added successfully", data);
    } catch (error) {
        console.error("Error adding DetailAvance:", error);
        return handleResponse(res, 500, "An error occurred while adding DetailAvance", { error: error.message });
    }
};

const getDetailAvanceByNumeroAvance = async (req, res) => {
    try {
        const { Numero_avance } = req.params;
        console.log("Recherche du DetailAvance avec Numero_avance:", Numero_avance);

        const data = await getDetailAvanceByNumeroAvanceServices(Numero_avance);
        if (!data) {
            return handleResponse(res, 404, "DetailAvance non trouvé. Veuillez vérifier le numéro.");
        }
        return handleResponse(res, 200, "DetailAvance récupéré avec succès", data);
    } catch (error) {
        console.error("Erreur dans le contrôleur getDetailAvanceByNumeroAvance:", error);
        return handleResponse(res, 500, "Erreur lors de la récupération du DetailAvance", { error: error.message });
    }
};
const getDetailAvanceById = async (req, res) => {
    try {
        const { id_detailAvance } = req.params;
        console.log("Recherche du DetailAvance avec ID:", id_detailAvance);

        const data = await getDetailAvanceByIdServices(id_detailAvance);
        if (!data) {
            return handleResponse(res, 404, "DetailAvance non trouvé. Veuillez vérifier le numéro.");
        }
        return handleResponse(res, 200, "DetailAvance récupéré avec succès", data);
    } catch (error) {
        return handleResponse(res, 500, "Erreur lors de la récupération du DetailAvance", { error: error.message });
    }
};

const updateDetailAvance = async (req, res) => {
    try {
        const { id_detailAvance } = req.params;
        const updatedDetailAvance = await updateDetailAvanceService(id_detailAvance, req.body);
        return handleResponse(res, updatedDetailAvance ? 200 : 404, updatedDetailAvance ? "DetailAvance updated successfully" : "DetailAvance not found", updatedDetailAvance);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating DetailAvance", { error: error.message });
    }
};

const deleteDetailAvance = async (req, res) => {
    try {
        const { id_detailAvance } = req.params;
        const detailAvance = await getDetailAvanceByIdServices(id_detailAvance);
        if (!detailAvance) {
            return handleResponse(res, 404, "DetailAvance not found");
        }
        
        const result = await deleteDetailAvanceService(id_detailAvance);
        if (result === 0) {
            return handleResponse(res, 404, "DetailAvance not found or already deleted");
        }

        return handleResponse(res, 200, "DetailAvance deleted successfully", detailAvance);
    } catch (error) {
        console.error("Error deleting DetailAvance:", error);
        return handleResponse(res, 500, "An error occurred while deleting DetailAvance", { error: error.message });
    }
};

module.exports = {
    getDetailAvance,
    addDetailAvance,
    getDetailAvanceById,
    updateDetailAvance,
    deleteDetailAvance,
    getDetailAvanceByNumeroAvance
};