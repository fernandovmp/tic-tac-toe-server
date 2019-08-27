const board = ['', '', '', '', '', '', '', '', ''];
const symbols = ['X', 'O'];
const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const defaultGameState = {
    board,
    symbols: ['X', 'O'],
    currentSymbol: -1,
    players: [],
    matchState: {
        end: false,
        result: ''
    }
}

module.exports = {
    symbols,
    winningSequences,
    defaultGameState
}