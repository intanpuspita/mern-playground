const express = require('express');
const router = express.Router();

// GET api/auth
// Public: don't need token
router.get('/', (req, res) => {
    res.send('Auth route');
})

module.exports = router;