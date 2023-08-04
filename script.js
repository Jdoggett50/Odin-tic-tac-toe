const boardModule = (()=>{
    //this changes the state of the board.
    const board = [[],[],[],[],[],[],[],[],[]];

    const getBoard = () => board;

    const insertAssignment = (selection,assignment) => {
        if(board[selection].length < 1){
            return board[selection].push(assignment);
        } else 
        return false;
    }

    return {
        getBoard,
        insertAssignment,
    }
})()

const player1 = {name:'john', assignment:'x',};
const player2 = {name:'haleigh', assignment:'o',};
const players = [player1,player2];

const getAssignment = (arr,players) => {
    const count = arr.filter(index => index != '')
    console.log(count.length)
    if(count.length === 0 || count.length % 2 === 0){
        return players[0].assignment;
    } else 
        return players[1].assignment;
}

//when the player selects an array space, 
//getAssignment(boardModule.getBoard(),players)
// ^^ gives the gameController the correct player based on the boards
// length

const gameController = (() => {
    //this monitors the state of the board and insertions into the board
    // const newGame = boardModule.getBoard();

    const winner = false;

    const _setPlayer = (name, assignment) => { 
        return {
            name, 
            assignment
        }
    }

    const _getWin = (arr) => {
        //if x or o is represented in only these spots, there is a 
        //winner
        //
    }

    const _checkWin = (arr) => {
        console.log(arr)
        //this will check if the game is won, if the game is won
        //display a message saying whichever player is the winner
        //compare the two player's assignments for the winner's value
    }
    
    const playRound = () => {

    }

    const startGame = (arr) => {
        _checkWin(newGame)
        //this will cycle through the turns
        //place the inputs inside the game
    }

    return {
        
    }
})()

