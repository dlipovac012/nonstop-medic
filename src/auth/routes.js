const router = require('express').Router();
const authService = require('./auth.service');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        res.json(await authService.login({ username, password }));
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        res.json(await authService.register({ username, password }));
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});

module.exports = router;