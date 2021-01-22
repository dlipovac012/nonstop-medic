const router = require('express').Router();

router.post('/login', (req, res) => {
    res.send('all users');
});

router.post('/register', (req, res) => {

});

module.exports = router;