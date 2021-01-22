const bcrypt = require('bcrypt');
const usersService = require('../users/users.service');

module.exports = {
    login: async ({ username, password }) => {
        let user;
        try {
            user = await usersService.getUserByUsername({ username });
        } catch (error) {
            throw new Error('User not found');
        }

        if (user) {
            const correct = await bcrypt.compare(password, user.password);
        }

        return { success: true };
    },
    register: async ({ username, password }) => {
        try {
            return await usersService.createUser({ username, password });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    logout: () => {},
}