const express = require('express'),
    router = express.Router();

router.post('/', async (req, res, next) => {
    console.log(req.body)
    res.json({ test: 'hi' })
});

module.exports = router;
