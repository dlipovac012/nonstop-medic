const usersService = require('../users/users.service');

module.exports = {
    login: async ({ username, password }) => {
        console.log(username);
        console.log(password);

        return { success: true };
    },
    register: async ({ username, password }) => {
        const user = await usersService.getUserByUsername(username);
        return { user: 123 };
    },
    logout: () => {},
}