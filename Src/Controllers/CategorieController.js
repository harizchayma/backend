const {
    getCategoriesServices,
    addCategoriesServices,
    getCategoriesByIdServices,
    updateCategoriesService,
    deleteCategoriesService
} = require("../Services/CategorieServices");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
};

const getCategories = async (req, res) => {
    try {
        console.log("Fetching categories..."); // Log avant l'appel
        const data = await getCategoriesServices();
        console.log("Categories retrieved:", data); // Log après l'appel
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Categories retrieved successfully" : "No categories found", data);
    } catch (error) {
        console.error("Error while retrieving categories:", error); // Log l'erreur
        return handleResponse(res, 500, "An error occurred while retrieving categories", { error: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Log pour vérifier la structure de la requête
        const data = await addCategoriesServices(req.body);
        return handleResponse(res, 201, "Category added successfully", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while adding category", { error: error.message });
    }
};



const getCategoryById = async (req, res) => {
    try {
        const data = await getCategoriesByIdServices(req.params.id);
        return handleResponse(res, data ? 200 : 404, data ? "Category retrieved successfully" : "Category not found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving category", { error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id_categorie } = req.params;
        const updatedCategory = await updateCategoriesService(id_categorie, req.body);
        return handleResponse(res, updatedCategory ? 200 : 404, updatedCategory ? "Category updated successfully" : "Category not found", updatedCategory);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating category", { error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id_categorie } = req.params;
        const category = await getCategoriesByIdServices(id_categorie);
        if (!category) {
            return handleResponse(res, 404, "Category not found");
        }
        await deleteCategoriesService(id_categorie);
        return handleResponse(res, 200, "Category deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting category", { error: error.message });
    }
};

module.exports = {
    getCategories,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
