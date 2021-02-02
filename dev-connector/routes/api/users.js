const express = require('express');
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const user = require('../../model/user');
const { JsonWebTokenError } = require('jsonwebtoken');

// GET api/users
// Public: don't need token
router.get('/', (req, res) => {
    res.send('User route');
})

// POST api/users
// Register User
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6})
], async (req, res) => {
    // check request validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        // check if user exists
        let selectedUser = await user.findOne({ name });
        if(selectedUser) {
            return res.status(400).send({ message: 'Name already exists' });
        }

        // get gravatar
        const avatar = gravatar.url(email, {
            s: '200', // size
            r: 'pg', // rating
            d: 'mm' // default picture
        });

        selectedUser = new user({
            name,
            email,
            avatar,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        selectedUser.password = await bcrypt.hash(password, salt);
        await selectedUser.save();

        // return jsonwebtoken
        const payload = {
            user: {
                id: selectedUser.id
            }
        }
        jwt.sign(payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err)
                        throw err;

                    console.log(token);
                    res.send({ token });
                });

    } catch(e) {
        console.log(e.message);
        res.status(500).send('Server Error!');
    }

    // res.send('User route');
})

module.exports = router;