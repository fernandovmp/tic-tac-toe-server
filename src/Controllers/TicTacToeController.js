const Invite = require('../models/Invite');
const { symbols, defaultGameState, winningSequences } = require('../games/TicTacToe');

module.exports = {
    startMatch: async function (inviteId, io, connectedUsers) {
        const { validInvite, sender, receptor } = await this.checkInvite(inviteId);
        if(!validInvite) return;
        this.deleteInvite(inviteId);
        
        const player1 = sender;
        const player2 = receptor;
        const gameState = defaultGameState;
        gameState.currentSymbol = 0;
        gameState.players = [player1, player2];
        
        if (connectedUsers[player1]) {
            io.to(connectedUsers[player1]).emit('startPlay', gameState);
            io.to(connectedUsers[player1]).connected[connectedUsers[player1]].on('makePlay', newState => {
                this.makePlay(newState, io, connectedUsers)
            });
            io.to(connectedUsers[player2]).emit('startPlay', gameState);
            io.to(connectedUsers[player2]).connected[connectedUsers[player2]].on('makePlay', newState => {
                this.makePlay(newState, io, connectedUsers)
            });
        }
        
    },
    makePlay: function (newState, io, connectedUsers) {
        newState = this.checkMatchEnd(newState);
        newState.currentSymbol = newState.currentSymbol === 0 ? 1 : 0;
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
            return {
                validInvite: true,
                sender: invite.sender,
                receptor: invite.receptor
            };
        } catch (error) {
            return false;
        }
    },
    checkWinningSequence: function (gameState, symbol) {
        for (let i in winningSequences) {
            if (gameState.board[winningSequences[i][0]] === symbol &&
                gameState.board[winningSequences[i][1]] === symbol &&
                gameState.board[winningSequences[i][2]] === symbol) {
                return true;
            }
        }
        return false;
    },
    checkMatchEnd(gameState) {
        if (this.checkWinningSequence(gameState, symbols[gameState.currentSymbol])) {
            gameState.matchState = {
                end: true,
                result: symbols[gameState.currentSymbol]
            }
        }
        if (gameState.board.indexOf('') === -1) {
            gameState.matchState = {
                end: true,
                result: 'tied'
            }
        }
        return gameState;
    }
}