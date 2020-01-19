const express = require('express');
const router = express.Router();

// Named functions will become the route names
router.get('/test', (req,res) => res.json({
    msg: 'Profiles api works!'
}))

module.exports = router;
