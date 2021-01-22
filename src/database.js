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
      },
});

const models = {
    User: require('./users/Model')(sequelize, DataTypes),
  };
  
  models.sequelize = sequelize;
  models.Sequelize = Sequelize;
  
  module.exports = models;