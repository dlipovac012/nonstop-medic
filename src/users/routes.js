const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('all users');
});

module.exports = router;