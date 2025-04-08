const Reservation = require("../Model/ReservationModel");

const getReservationServices = async () => {
  try {
    return await Reservation.findAll();
  } catch (error) {
    console.error('Error fetching Reservations:', error);
    throw new Error("Database error while fetching reservations");
  }
};

const getLastNumeroReservation = async () => {
  try {
    const lastReservation = await Reservation.findOne({
      order: [['id_reservation', 'DESC']],
      attributes: ['num_immatriculation'] // Assuming you want to get the last reservation by vehicle number
    });
    return lastReservation ? lastReservation.num_immatriculation : null;
  } catch (error) {
    console.error("Error fetching last Numero_reservation:", error);
    throw new Error("Database error while fetching last reservation number");
  }
};

const addReservationServices = async (body) => {
  try {
    // You can implement a similar logic for generating a unique reservation number if needed
    // For now, we will just create the reservation directly
    return await Reservation.create(body);
  } catch (error) {
    console.error("Error adding Reservation:", error);
    throw new Error("Database error while adding reservation");
  }
};

const getReservationByIdServices = async (id_reservation) => {
  try {
    const reservation = await Reservation.findOne({ where: { id_reservation } });
    return reservation;
  } catch (error) {
    console.error("Error fetching reservation by ID:", error);
    throw new Error("Database error while fetching reservation by ID");
  }
};
// In ReservationServices.js
const getReservationServicesByCin = async (cin_client) => {
  try {
      return await Reservation.findAll({ where: { cin_client } }); // Ensure that cin_client is included in the model
  } catch (error) {
      console.error("Error fetching Reservations by CIN:", error);
      throw new Error("Database error while fetching reservations by cin");
  }
};
const updateReservationService = async (id_reservation, body) => {
  console.log("updateReservationService called with id:", id_reservation, "and body:", body);
  try {
      const [rowsAffected] = await Reservation.update(body, {
          where: { id_reservation },
      });

      if (rowsAffected > 0) {
          return await Reservation.findByPk(id_reservation);
      } else {
          return null; // No rows were updated, reservation not found or no changes
      }
  } catch (error) {
      console.error("Error updating Reservation:", error);
      throw new Error("Database error while updating reservation");
  }
};
const deleteReservationService = async (id_reservation) => {
  try {
    const deleted = await Reservation.destroy({
      where: { id_reservation }
    });
    return deleted;
  } catch (error) {
    console.error("Error deleting Reservation:", error);
    throw new Error("Database error while deleting reservation");
  }
};

const updateReservationActionService = async (id_reservation, action) => {
  console.log("updateReservationActionService called with id:", id_reservation, "and action:", action);
  try {
      const [rowsAffected] = await Reservation.update(
          { action: action },
          { where: { id_reservation } }
      );

      if (rowsAffected > 0) {
          return await Reservation.findByPk(id_reservation);
      } else {
          return null; // No rows were updated, reservation not found or no changes
      }
  } catch (error) {
      console.error("Error updating Reservation action:", error);
      throw new Error("Database error while updating reservation action");
  }
};

module.exports = {
  getReservationServices,
  getReservationServicesByCin,
  addReservationServices,
  getReservationByIdServices,
  updateReservationService,
  deleteReservationService,
  updateReservationActionService // Ajout du nouveau service
};