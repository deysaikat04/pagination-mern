const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const data = req.header('Authorization');
    const token = data.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: { message: 'No token, authorization denied' } });
    }

    try {
        jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
            if (error) {

                return res.status(401).json({ error: { message: 'Token is not valid' } });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};