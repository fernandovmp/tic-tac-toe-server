const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    inMatch: {
        type: Boolean
    },
    online: {
        type: Boolean
    },
    wonMatches: {
        type: Number
    },
    lostMatches: {
        type: Number
    },
    tiedMatches: {
        type: Number
    },
    invites: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Invite' 
    }]
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);