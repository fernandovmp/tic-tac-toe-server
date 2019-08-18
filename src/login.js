const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if(!user) {
                throw {
                    userDoesntExists: true
                };
            }
            
            if(bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                    expiresIn: 300
                });
                res.cookie('access-token', token, {
                    maxAge: 300000,
                    httpOnly: true
                });
                return res.json({
                    auth: true
                });
            }
            throw 'bad password';
        
        } catch (error) {
            res.status(401);
            return res.json();
        }
        
    }
};