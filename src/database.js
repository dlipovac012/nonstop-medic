const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'nonstop',
    username: 'nonstop',
    password: 'password123',
    host: 'db',
    define: {
        underscored: true,
        charset: 'utf8',
        timestamps: false,
        paranoid: false,
      },
});

const db = {};
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  module.exports = db;