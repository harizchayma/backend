const Client = require("../Model/ClientModel");
const {
    getClientServices,
    addClientServices,
    getClientByIdServices,
    updateClientService,
    deleteClientService,
    getClientByCINService,
    verifyPassword,
    updateClientLoginInfoService // Assurez-vous que ce service est importé
} = require("../Services/ClientServices");


const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
};

const getClient = async (req, res) => {
    try {
        const data = await getClientServices();
        return handleResponse(res, 200, data.length > 0 ? "Clients retrieved successfully" : "No clients found", data);
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

const getClientByCIN = async (req, res) => {
    const { cin_client } = req.query; // Get the cin_client from the query parameters
    try {
        const client = await getClientByCINService(cin_client);
        if (client) {
            return handleResponse(res, 200, 'Client retrieved successfully', client);
        } else {
            return handleResponse(res, 404, 'Client not found');
        }
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

const addClient = async (req, res) => {
    try {
        console.log("Received body:", req.body); 
        const data = await addClientServices(req.body);
        return handleResponse(res, 201, "Client added successfully", data);
    } catch (error) {
        return handleResponse(res, 400, error.message, null);
    }
};

const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ where: { email } });

        if (!client) {
            return handleResponse(res, 404, "Client not found");
        }

        const isPasswordValid = await verifyPassword(password, client.password);
        if (!isPasswordValid) {
            return handleResponse(res, 401, "Invalid password");
        }

        return handleResponse(res, 200, "Login successful", { cin_client: client.cin_client });
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

const getClientById = async (req, res) => {
    try {
        const data = await getClientByIdServices(req.params.id_client);
        return handleResponse(res, data ? 200 : 404, data ? "Client retrieved successfully" : "Client not found", data);
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const { id_client } = req.params;
        const updatedClient = await updateClientService(id_client, req.body);
        return handleResponse(res, updatedClient ? 200 : 404, updatedClient ? "Client updated successfully" : "Client not found", updatedClient);
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};
const updateClientLoginInfo = async (req, res) => {
    const { id_client } = req.params;
    const { email, password } = req.body;

    try {
        const updatedClient = await updateClientLoginInfoService(id_client, email, password);
        if (updatedClient) {
            return handleResponse(res, 200, "Informations de connexion mises à jour avec succès", updatedClient);
        } else {
            return handleResponse(res, 404, "Client non trouvé");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des informations de connexion:", error);
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id_client } = req.params;
        const clientExists = await getClientByIdServices(id_client);
        if (!clientExists) {
            return handleResponse(res, 404, "Client not found");
        }
        await deleteClientService(id_client);
        return handleResponse(res, 200, "Client deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, error.message, { error: error.message });
    }
};

module.exports = {
    getClient,
    addClient,
    getClientById,
    updateClient,
    deleteClient,
    getClientByCIN,
    loginClient,
    updateClientLoginInfo 
};