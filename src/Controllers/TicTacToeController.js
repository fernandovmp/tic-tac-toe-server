const Invite = require('../models/Invite');

module.exports = {
    startMatch: async function (gameState, io, connectedUsers) {
        const [player1, player2] = gameState.players;
        const validInvite = await this.checkInvite(gameState.invite);
        if(!validInvite) return;
        this.deleteInvite(gameState.invite);
        if (connectedUsers[player1]) {
            io.to(connectedUsers[player1]).emit('startPlay', gameState);
            io.to(connectedUsers[player1]).connected[connectedUsers[player1]].on('makePlay', newState => {
                this.makePlay(newState, io, connectedUsers)
            });
            io.to(connectedUsers[player2]).connected[connectedUsers[player2]].on('makePlay', newState => {
                this.makePlay(newState, io, connectedUsers)
            });
        }
        
    },
    makePlay: function (newState, io, connectedUsers) {
        const [player1, player2] = newState.players;
        if (connectedUsers[player1] && connectedUsers[player2]) {
            if (newState.matchState.end) {
                if (newState.matchState.result === 'X') {
                    newState.matchState.result = player1;
                }
                else if (newState.matchState.result === 'O') {
                    newState.matchState.result = player2;
                }
            }
            io.to(connectedUsers[player1]).emit('makePlay', newState);
            io.to(connectedUsers[player2]).emit('makePlay', newState);
        }
        
    },
    async deleteInvite(inviteId) {
        await Invite.deleteOne({ _id: inviteId });
    },
    async checkInvite(inviteId) {
        try {
            const invite = await Invite.findById(inviteId);
            if(!invite) {
                throw new Error();
            }
            return true;
        } catch (error) {
            return false;
        }
    }
}