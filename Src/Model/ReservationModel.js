const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Reservation = db.define("Reservation", {
    id_reservation: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true 
    },
    Date_debut: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    Heure_debut: { 
        type: DataTypes.STRING(8), 
        allowNull: false 
    },
    Date_retour: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    Heure_retour: { 
        type: DataTypes.STRING(8), 
        allowNull: false 
    },
    Duree_location: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    num_immatriculation: { 
        type: DataTypes.STRING(20), 
        allowNull: false,
        unique: true
    },
    cin_client: { 
        type: DataTypes.STRING(8), 
        allowNull: false,
        unique: true 
    },
    Prix_total: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    action: { // Add action attribute
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en attent' // Default value if other action values not provided
    }
}, {
    tableName: "reservation",
    timestamps: false,
    freezeTableName: true
});

module.exports = Reservation;