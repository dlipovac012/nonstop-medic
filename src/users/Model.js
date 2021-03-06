const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../database');

module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('user',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: {
                    args: [5, 25],
                    msg: 'invalid_username',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [4, 64],
                msg: 'invalid_password',
              },
            },
          },
    }, {
        hooks: {
          afterValidate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, bcrypt.genSaltSync(13));
            user.password = hashedPassword;
             },
        },
        tableName: 'users',
    });

    return User;
})(sequelize, DataTypes);