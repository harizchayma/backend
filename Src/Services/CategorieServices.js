const Categorie = require("../Model/CategorieModel");

const getCategoriesServices = async () => {
    try {
        const categories = await Categorie.findAll();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const addCategoriesServices = async (body) => {
    try {
        const data = await Categorie.create(body);
        console.log("Added category:", data);
        return data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

const getCategoriesByIdServices = async (id_categorie) => {
    return await Categorie.findByPk(id_categorie);
};

const updateCategoriesService = async (id_categorie, body) => {
    const [updated] = await Categorie.update(body, { where: { id_categorie } });
    return updated ? await Categorie.findByPk(id_categorie) : null;
};

const deleteCategoriesService = async (id_categorie) => {
    return await Categorie.destroy({ where: { id_categorie } });
};

module.exports = {
    getCategoriesServices,
    addCategoriesServices,
    getCategoriesByIdServices,
    updateCategoriesService,
    deleteCategoriesService
};
