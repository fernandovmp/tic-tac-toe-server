const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function verifyJwt(req, res, next) {
    const token = req.cookies['access-token'];
    if(!token) {
        res.status(401);
        return res.json({
            auth: false,
            message: 'No token provided'
        });
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(500);
            return res.json({ 
                auth: false, 
                message: 'Failed to authenticate token.' 
            });
        }
        req.userId = decoded.id;
        next();
    });
    
};