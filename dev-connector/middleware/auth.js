const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    // check if token exists
    if(!token) {
        return res.status(401).send({ message: 'No token, authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(e) {
        res.status(401).send({ message: 'Token is not valid!' });
    }
}