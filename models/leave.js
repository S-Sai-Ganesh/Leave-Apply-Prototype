const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Leave = sequelize.define('leave', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Leave;