const Client = require("../Model/ClientModel");
const argon2 = require("argon2");

const getClientServices = async () => {
    try {
        return await Client.findAll();
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw new Error("Could not retrieve clients");
    }
};

const addClientServices = async (body) => {
    try {
        const exists = await Client.findOne({ where: { cin_client: body.cin_client } });
        if (exists) {
            throw new Error("Le client avec ce numéro de CIN existe déjà.");
        }

        // Hash the password before saving if provided
        if (body.password) {
            body.password = await argon2.hash(body.password);
        }
        // Si body.password n'est pas fourni, il restera undefined dans la base de données

        console.log("Body received in addClientServices:", body);
        return await Client.create(body);
    } catch (error) {
        console.error("Error adding client:", error);
        throw new Error(error.message || "Could not add the client");
    }
};

const getClientByIdServices = async (id_client) => {
    try {
        return await Client.findByPk(id_client);
    } catch (error) {
        console.error("Error fetching client by ID:", error);
        throw new Error("Could not retrieve the client");
    }
};

const getClientByCINService = async (cin_client) => {
    try {
        return await Client.findOne({ where: { cin_client } });
    } catch (error) {
        console.error("Error fetching client by CIN:", error);
        throw new Error("Could not retrieve the client by CIN");
    }
};

const updateClientService = async (id_client, body) => {
    try {
        const client = await Client.findByPk(id_client);
        if (!client) {
            throw new Error("Client not found");
        }
        await client.update(body);
        return client;
    } catch (error) {
        console.error("Error updating client:", error);
        throw new Error(error.message || "Could not update the client");
    }
};

const deleteClientService = async (id_client) => {
    try {
        const deleted = await Client.destroy({ where: { id_client } });
        if (!deleted) {
            throw new Error("Client not found or could not be deleted");
        }
        return true;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw new Error("Could not delete the client");
    }
};

const verifyPassword = async (inputPassword, storedPassword) => {
    return await argon2.verify(storedPassword, inputPassword);
};

const updateClientLoginInfoService = async (id_client, email, password) => {
    try {
        const client = await Client.findByPk(id_client);
        if (!client) {
            throw new Error("Client non trouvé");
        }

        const updateData = {};
        if (email !== undefined) {
            updateData.email = email;
        }
        if (password !== undefined) {
            updateData.password = await argon2.hash(password);
        }

        await client.update(updateData);
        return client;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des informations de connexion:", error);
        throw new Error(error.message || "Impossible de mettre à jour les informations de connexion");
    }
};

module.exports = {
    getClientServices,
    addClientServices,
    getClientByIdServices,
    updateClientService,
    deleteClientService,
    getClientByCINService,
    verifyPassword,
    updateClientLoginInfoService // Assurez-vous que ce service est exporté
};