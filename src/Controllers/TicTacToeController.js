

module.exports = {
    startMatch: function (gameState, io, connectedUsers) {
        const [player1, player2] = gameState.players;
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
        
    }
}