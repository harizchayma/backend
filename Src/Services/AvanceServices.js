const Avance = require("../Model/AvanceModel");

const getAvanceServices = async () => {
  try {
    return await Avance.findAll();
  } catch (error) {
    console.error('Error fetching Avance:', error);
    throw new Error("Database error while fetching advances");
  }
};

const getLastNumeroAvance = async () => {
  try {
    const lastAvance = await Avance.findOne({
      order: [['id_avance', 'DESC']],
      attributes: ['Numero_avance']
    });
    return lastAvance ? lastAvance.Numero_avance : null;
  } catch (error) {
    console.error("Error fetching last Numero_avance:", error);
    throw new Error("Database error while fetching last advance number");
  }
};

const addAvanceServices = async (body) => {
    try {
        const lastNumeroAvance = await getLastNumeroAvance();
        let newNumeroAvance;

        if (lastNumeroAvance) {
            const lastNumber = parseInt(lastNumeroAvance.slice(1));
            const nextNumber = lastNumber + 1;
            newNumeroAvance = `V${nextNumber.toString().padStart(4, '0')}`;
        } else {
            newNumeroAvance = 'V0001';
        }

        console.log("Last Numero_avance:", lastNumeroAvance);
        console.log("New Numero_avance:", newNumeroAvance);

        body.Numero_avance = newNumeroAvance;
        console.log("Numero_avance avant création :", body.Numero_avance);
        console.log("body entier avant création", body);

        const createdAvance = await Avance.create(body);

        console.log("Resultat de la création",createdAvance);

        return createdAvance;

        return createdAvance;
    } catch (error) {
        console.error("Error adding Avance:", error);
        throw new Error("Database error while adding advance");
    }
};

const getAvanceByIdServices = async (id_avance) => {
  try {
    const avance = await Avance.findOne({ where: { id_avance } });
    return avance;
  } catch (error) {
    console.error("Error fetching avance by ID:", error);
    throw new Error("Database error while fetching advance by ID");
  }
};

const updateAvanceService = async (id_avance, body) => {
  try {
    const [updated] = await Avance.update(body, {
      where: { id_avance },
    });
    return updated ? await Avance.findByPk(id_avance) : null;
  } catch (error) {
    console.error("Error updating Avance:", error);
    throw new Error("Database error while updating advance");
  }
};

const deleteAvanceService = async (id_avance) => {
  try {
    const deleted = await Avance.destroy({
      where: { id_avance }
    });
    return deleted;
  } catch (error) {
    console.error("Error deleting Avance:", error);
    throw new Error("Database error while deleting advance");
  }
};

module.exports = {
  getAvanceServices,
  addAvanceServices,
  getAvanceByIdServices,
  updateAvanceService,
  deleteAvanceService
};