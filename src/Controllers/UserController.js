const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    
    async index(req, res) {
        const users = await User.find().select('-password');
        return res.json(users);  
    },
    async indexById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                throw {
                    userDoestExists: true
                };
            }
            return res.json(user);
        } catch (error) {
            res.status(204);
            
            const { userDoestExists } = error;
            if (userDoestExists) {
                return res.json(error);
            }
            
            return res.json();
        }
    },
    async indexSelf(req, res) {
        try {
            const id = req.userId;
            const user = await User.findById(id).select('-password -invites');
            return res.json(user);
        } catch (error) {
            res.status(401);
            return res.json();
        }
    },
    async store(req, res) {
        const { username, password } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            console.log(`${username} already exists`);
            return res.json({ userAlreadyExists: true });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const cryptPassword = bcrypt.hashSync(password, salt);
        
        let user = await User.create({
            username,
            password: cryptPassword,
            wonMatches: 0,
            tiedMatches: 0,
            lostMatches: 0
        });
        user = await User.findById(user._id).select('-password');
        console.log(`${username} created!`)
        res.status(201);
        return res.json(user);
    },
    async update(req, res) {
        const { wonMatches, tiedMatches, lostMatches } = req.body;
        let user = undefined;
        try {
            user = await User.findById(req.params.id);
            if (!user) {
                throw {
                    userDoestExists: true
                };
            }
        } catch (error) {
            res.status(204);
            
            const { userDoestExists } = error;
            if (userDoestExists) {
                return res.json(error);
            }
            
            return res.json();
        }
        
        if(wonMatches !== undefined) {
            user.wonMatches = wonMatches;
        }
        if(tiedMatches !== undefined) {
            user.tiedMatches = tiedMatches;
        }
        if(lostMatches !== undefined) {
            user.lostMatches = lostMatches;
        }
        await user.save();
        console.log(`${user.username} updated`);
        return res.json();
    }
}