const { Schema, model } = require('mongoose');

const InviteSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receptor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    new: {
        type: Boolean
    }
}, {
    timestamps: true
});

module.exports = model('Invite', InviteSchema);