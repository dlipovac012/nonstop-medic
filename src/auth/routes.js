const router = require('express').Router();
const authService = require('./auth.service');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        res.json(await authService.login({ username, password }));
    } catch (error) {
        
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        res.json(await authService.register({ username, password }));
    } catch (error) {
        
    }
});

module.exports = router;