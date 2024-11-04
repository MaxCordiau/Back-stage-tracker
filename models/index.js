// models/index.js
const { Sequelize } = require('sequelize'); 
const sequelize = require('../config/config');
const Stage = require('./stage'); 

const models = {
    Stage,
    sequelize
};

module.exports = models;
