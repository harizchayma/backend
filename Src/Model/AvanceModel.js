const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Avance = db.define("Avance", {
    id_avance: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cin_client: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Numero_contrat: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
            model: 'contrat',
            key: 'Numero_contrat'
        }
    },
    Numero_avance: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    tableName: "avance",
    timestamps: false,
    freezeTableName: true
});

module.exports = Avance;