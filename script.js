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
    // console.log(count.length)
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
    const newGame = boardModule.getBoard();
    for(let i = 0; i < newGame.length; i++){
        boardModule.insertAssignment(i,getAssignment(newGame,players))
    }
    console.log(newGame)


    const _setPlayer = (name, assignment) => { 
        return {
            name, 
            assignment
        }
    }

    const _checkWin = (arr) => {
        
        const winCases = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        // let win = winCases[0]
        console.log(arr[2], arr[4], arr[6])
        console.log(arr[2] === arr[4] && arr[4] === arr[6])
        for(const [a, b, c] of winCases){
            console.log(arr[a],arr[b], arr[c])
            
        }

        // for(let i = 0; i < winCases.length; i++){

        // }
    }

    _checkWin(newGame)

    const playRound = () => {

    }

    const startGame = (arr) => {
        //this will cycle through the turns
        //place the inputs inside the game
    }

    return {
        
    }
})()

