const express = require('express');
const router = express.Router();

// GET api/profile
// Public: don't need token
router.get('/', (req, res) => {
    res.send('Profile route');
})

module.exports = router;