const UserModel = require('./Model');

module.exports = {
    createUser: async () => {},
    getUserByUsername: async (username) => {
        if (typeof username != 'string') {
            throw new Error('username invalid');
        }

        return await UserModel.findOne({ where: { username }});
    },
};