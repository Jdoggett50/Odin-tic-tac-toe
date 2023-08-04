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
const newGame = boardModule.getBoard();
newGame[4].push(player1.assignment)
newGame[2].push(player2.assignment)

const getAssignment = (arr,players) => {
    const count = arr.filter(index => index != '')
    console.log(count.length)
    console.log(Boolean((count.length % 2) + 1 === 0))
    if(count.length === 0 || count.length % 2 + 1 === 0){
        return players[0].assignment;
    } else 
        return players[1].assignment;
}

console.log(getAssignment(boardModule.getBoard(),players))

const gameController = (() => {
    //this monitors the state of the board and insertions into the board

    const setPlayer = (name, assignment) => { 
        return {
            name, assignment
        }
    }
    

    return {
        setPlayer,
    }
})()

