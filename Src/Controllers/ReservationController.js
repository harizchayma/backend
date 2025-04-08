const { createReservationSchema } = require('../Validations/ReservationValidation'); // Assurez-vous que cet import est correct
const {
  getReservationServices,
  addReservationServices,
  getReservationByIdServices,
  updateReservationService,
  deleteReservationService,
  updateReservationActionService 
} = require("../Services/ReservationServices");
const Reservation = require("../Model/ReservationModel");

const handleResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    message: message,
    data: data
  });
};

const getReservation = async (req, res) => {
  try {
    const data = await getReservationServices();
    return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Réservations récupérées avec succès" : "Aucune réservation trouvée", data);
  } catch (error) {
    return handleResponse(res, 500, "Une erreur est survenue lors de la récupération des réservations", { error: error.message });
  }
};

const getReservationByCin = async (req, res) => {
  const { cin_client } = req.params;

  try {
    const data = await getReservationServicesByCin(cin_client);
    return handleResponse(res, data.length ? 200 : 404,
      data.length ? "Réservations récupérées avec succès" : "Aucune réservation trouvée",
      data);
  } catch (error) {
    console.error("Error fetching reservations by cin:", error);
    return handleResponse(res, 500, "Une erreur est survenue lors de la récupération des réservations", { error: error.message });
  }
};
// Add the service function in the service layer
const getReservationServicesByCin = async (cin_client) => {
  try {
      return await Reservation.findAll({ where: { cin_client } }); // Adjust the filtering based on your actual database schema
  } catch (error) {
      console.error("Error fetching Reservations by CIN:", error);
      throw new Error("Database error while fetching reservations by cin");
  }
};
const addReservation = async (req, res) => {
  try {
      console.log("Données de réservation reçues :", JSON.stringify(req.body, null, 2));
      console.log("Type de Date_debut :", typeof req.body.Date_debut);
      console.log("Type de Prix_total :", typeof req.body.Prix_total);
      console.log("Type de cin_client :", typeof req.body.cin_client);

      const { error } = createReservationSchema.validate(req.body);
      if (error) {
          console.error("Erreur de validation Joi :", JSON.stringify(error.details, null, 2));
          return res.status(400).json({ message: "Erreur de validation", details: error.details });
      }

      const data = await addReservationServices(req.body);
      return res.status(201).json({ message: "Réservation ajoutée avec succès", data: data });
  } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation:", error);
      return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la réservation", error: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const { id_reservation } = req.params;
    const data = await getReservationByIdServices(id_reservation);
    if (!data) {
      return handleResponse(res, 404, "Réservation non trouvée. Veuillez vérifier le numéro.");
    }
    return handleResponse(res, 200, "Réservation récupérée avec succès", data);
  } catch (error) {
    return handleResponse(res, 500, "Erreur lors de la récupération de la réservation", { error: error.message });
  }
};

const updateReservation = async (req, res) => {
  console.log("updateReservation called with params:", req.params, "and body:", req.body);
  try {
      const { id_reservation } = req.params;
      const updatedReservation = await updateReservationService(id_reservation, req.body);
      console.log("updateReservationService result:", updatedReservation);
      if (!updatedReservation) {
          return res.status(404).json({ message: "Réservation non trouvée" });
      }
      return res.json({ message: "Réservation mise à jour avec succès", updatedReservation });
  } catch (error) {
      console.error("Error updating reservation:", error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id_reservation } = req.params;
    const reservation = await getReservationByIdServices(id_reservation);
    if (!reservation) {
      return handleResponse(res, 404, "Réservation non trouvée");
    }

    const result = await deleteReservationService(id_reservation);
    if (result === 0) {
      return handleResponse(res, 404, "Réservation non trouvée ou déjà supprimée");
    }

    return handleResponse(res, 200, "Réservation supprimée avec succès", reservation);
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    return handleResponse(res, 500, "Une erreur est survenue lors de la suppression de la réservation", { error: error.message });
  }
};

const updateReservationAction = async (req, res) => {
  console.log("updateReservationAction called with params:", req.params, "and body:", req.body);
  try {
      const { id_reservation } = req.params;
      const { action } = req.body;

      const updatedReservation = await updateReservationActionService(id_reservation, action);
      console.log("updateReservationActionService result:", updatedReservation);

      if (!updatedReservation) {
          return res.status(404).json({ message: "Réservation non trouvée" });
      }
      return res.json({ message: "Action de la réservation mise à jour avec succès", updatedReservation });
  } catch (error) {
      console.error("Error updating reservation action:", error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
module.exports = {
  getReservation,
  getReservationByCin,
  addReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  updateReservationAction // Ajout du nouveau contrôleur
};