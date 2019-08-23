const mongoose = require('mongoose');
const User = require('../models/User');
const Invite = require('../models/Invite');

module.exports = {
    async index(req, res) {
        try {
            const user = await User.findById(req.userId).populate({ path: 'invites', populate: [
                { path: 'sender', select: '-password -invites' }, { path: 'receptor', select:'-password -invites' }
            ]});
            if(!user) {
                throw { 
                    userDoestExists: true
                };
            }
            const { invites } = user;
            return res.json(invites);
        } catch (error) {
            res.status(204);
            
            const { userDoestExists } = error;
            if (userDoestExists) {
                return res.json(error);
            }
            
            return res.json();
        }
       
    },
    async store(req, res) {
        try {
            const targetUser = await User.findById(req.params.id);
            const user = await User.findById(req.userId);
            
            if(!targetUser) {
                throw {
                    receptorDoestExists: true
                };
            }
            if(!user) {
                throw {
                    senderDoestExists: true
                };
            }
            
            const invite = await Invite.create({
                sender: user._id,
                receptor: targetUser._id
            });
            targetUser.invites.push(invite._id);
            await targetUser.save();
            const targetSocket = req.connectedUsers[targetUser._id];
            if(targetSocket) {
                req.io.to(targetSocket).emit('invite');
            }
            
            
            console.log(`${user.username} invites ${targetUser.username}`);
            res.status(201);
            return res.json(invite);
        } catch (error) {
            res.status(204);
            
            const { receptorDoestExists, senderDoestExists } = error;
            if(receptorDoestExists || senderDoestExists) {
                return res.json(error);
            }
            
            return res.json();
        }
    },
    async destroy(req, res) {
        try {
            const user = await User.findById(req.userId);
            
            if(!user) {
                throw {
                    userDoestExists: true
                };
            }
            
            const { inviteId } = req.params;
            user.invites = user.invites.filter(item => {
                if (item._id != inviteId) {
                    return item;
                }
            });

            await Invite.remove({ _id: inviteId });
            await user.save();
            return res.json();
        } catch (error) {
            res.status(204);
            
            const { userDoestExists } = error;
            if (userDoestExists) {
                return res.json(error);
            }
            
            return res.json();
        }
        
    }
};