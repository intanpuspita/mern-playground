const express = require('express');
const router = express.Router();

// GET api/posts
// Public: don't need token
router.get('/', (req, res) => {
    res.send('Posts route');
})

module.exports = router;