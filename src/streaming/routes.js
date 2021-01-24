const router = require('express').Router();
const { v4: uuidV4 } = require('uuid');


router.get('/get-room', (req, res) => {
    res.status(200).json({
        roomId: uuidV4()
    })
});

router.get('/:roomId', (req, res) => {
    console.log(req.params.roomId);

    res.send(req.params.roomId);
});

module.exports = router;