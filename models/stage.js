const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Stage = sequelize.define('Stage', {
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    application_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    contract_duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desired_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location_name: {
        type: DataTypes.ENUM('Sur Place', 'A Distance', 'Teletravail'), 
        allowNull: false,
    },
    tag_name: {
        type: DataTypes.ENUM('A Envoyer', 'Envoyer', 'A Suivre', 'Entretien Prevue', 'Accepter', 'Refuser'), 
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Email', 'Tel', 'Interview'), 
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    upload: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'stages',
    timestamps: false,
    underscored: true,
});

module.exports = Stage;
