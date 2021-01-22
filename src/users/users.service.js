const UserModel = require('./Model');

module.exports = {
    createUser: async ({ username, password }) => {
        try {
            return await UserModel.create({
                username,
                password,
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getUserByUsername: async ({ username }) => {
        if (typeof username != 'string') {
            throw new Error('username invalid');
        }

        try {
            return await UserModel.findOne({ where: { username }});
        } catch (error) {
            console.log(error);
        }
    },
};