const express = require('express');
const auth = require('../../middleware/auth');
const user = require('../../model/user');
const router = express.Router();

// GET api/auth
router.get('/', auth, async (req, res) => {
    try {
        const selectedUser = await user.findById(req.user.id).select('-password'); // select everthing except password
        console.log(selectedUser);
        res.send(selectedUser);
    } catch(e) {
        console.log(e.message);
        res.status(500).send('Server error!');
    }
})

module.exports = router;