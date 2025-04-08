const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const DetailAvance = db.define("DetailAvance", {
    id_detailAvance: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    mode_reglement: { 
        type: DataTypes.STRING,
        allowNull: true 
    },
    montant: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    banque: { 
        type: DataTypes.STRING,
        allowNull: true 
    },
    Numero_avance: { 
        type: DataTypes.STRING,
        allowNull: false, 
        references: {
            model: 'avance', 
            key: 'Numero_avance' 
        }
    },
    NumeroPiece: { // Ajout du numéro de pièce
        type: DataTypes.STRING,
        allowNull: true // Optionnel
    },
    echeance: { // Ajout de la date d'échéance
        type: DataTypes.DATEONLY, // Utilisation de DATEONLY pour stocker uniquement la date
        allowNull: true // Optionnel
    }
}, {
    tableName: "detailavance",
    timestamps: false,
    freezeTableName: true
});

module.exports = DetailAvance;
