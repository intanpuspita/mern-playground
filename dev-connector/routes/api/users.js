const express = require('express');
const router = express.Router();

// GET api/users
// Public: don't need token
router.get('/', (req, res) => {
    res.send('User route');
})

module.exports = router;