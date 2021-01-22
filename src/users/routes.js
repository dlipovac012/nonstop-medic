const router = require('express').Router();

router.get('/all', (req, res) => {
    res.send('all users');
});

router.get('/me', mid, (req, res) => {
    res.send('me');
});

function mid(req, res, next) {
    console.log('middleware');

    next();
}

module.exports = router;